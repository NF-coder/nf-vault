import { Attrs, Mark, MarkType } from "prosemirror-model"
import { InputRule } from "prosemirror-inputrules"
import { EditorState } from "prosemirror-state";

const escapeRegex = (string: string) => {
  // eslint-disable-next-line no-useless-escape
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const getMarksBetween = (start: number, end: number, state: EditorState) => {
  let marks: {start: number; end: number; mark: Mark}[] = [];

  state.doc.nodesBetween(start, end, (node, pos) => {
    marks = [
      ...marks,
      ...node.marks.map((mark) => ({
        start: pos,
        end: pos + node.nodeSize,
        mark,
      })),
    ];
  });

  return marks;
}

type AutoRegexp = {
  open: string;
  close: string;
}

export const markInputRule = (
  {
    rule,
    markType,
    getAttrs
  } : {
    rule: RegExp | AutoRegexp,
    markType: MarkType,
    getAttrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)
  }
) => {

  let regexp: RegExp;
  if (rule instanceof RegExp) {
    regexp = rule;
  } else {
    const open = `${escapeRegex(rule.open)}`;
    const close = `${escapeRegex(rule.open)}`;
    const inner = `(.+?)`;
    regexp = new RegExp(`(?<!\S)${open}${inner}${close}(?!\S)`);
  }

  return new InputRule(regexp, (state, match, start, end) => {
    if (!match) return null;

    const attrs = typeof getAttrs === 'function' ? getAttrs(match as RegExpMatchArray) : getAttrs;
    const { tr } = state;
    const inner = (match as RegExpMatchArray)[1];
    if (!inner) return null;

    // вычисляем границы внутреннего текста в документе
    const innerOffsetInMatch = (match as RegExpMatchArray)[0].indexOf(inner);
    const innerStart = start + innerOffsetInMatch;
    const innerEnd = innerStart + inner.length;

    // проверяем марки, которые запрещают применение этого типа метки
    const marksBetween = getMarksBetween(start, end, state);
    const excludedMarks = marksBetween
      .filter((item) => item.mark.type.excludes(markType))
      .filter((item) => item.end > innerStart && item.start < innerEnd);

    if (excludedMarks.length) return null;

    // удаляем открывающий и закрывающий маркеры (сначала trailing, затем leading)
    if (innerEnd < end) tr.delete(innerEnd, end);
    if (innerStart > start) tr.delete(start, innerStart);

    // добавляем марку на внутренний текст (после удалений теперь это [start, start + inner.length])
    tr.addMark(start, start + inner.length, markType.create(attrs));
    tr.removeStoredMark(markType);

    return tr;
  });
}