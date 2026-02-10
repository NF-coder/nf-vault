import { NodeType, Attrs, Mark } from "prosemirror-model";
import { InputRule } from "prosemirror-inputrules";
import { EditorState } from "prosemirror-state"

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

export const markInputRuleWithMarker = (
  {
    rule,
    markType,
    markerType,
    getAttrs
  }: {
    rule: RegExp | { open: string; close: string },
    markType: any,
    markerType: NodeType,
    getAttrs?: Attrs | null | ((match: RegExpMatchArray) => Attrs | null)
  }
) => {

  let regexp: RegExp;
  if (rule instanceof RegExp) {
    regexp = rule;
  } else {
    const open = `${escapeRegex(rule.open)}`;
    const close = `${escapeRegex(rule.close)}`;
    const inner = `(.+?)`;
    regexp = new RegExp(`(?<!\\S)${open}${inner}${close}(?!\\S)`);
  }

  return new InputRule(regexp, (state: EditorState, match, start, end) => {
    if (!match) return null;

    const attrs = typeof getAttrs === 'function' ? getAttrs(match) : getAttrs;
    const tr = state.tr;

    const inner = match[1];
    if (!inner) return null;

    // вычисляем границы внутреннего текста в текущем документе
    const fullMatch = match[0];
    const innerOffsetInMatch = fullMatch.indexOf(inner);
    const innerStart = start + innerOffsetInMatch;
    const innerEnd = innerStart + inner.length;

    // создаём nodes для открывающего и закрывающего маркеров
    const openMarker = markerType.create({
      kind: markType.name,
      text: fullMatch.slice(0, innerOffsetInMatch),
      className: `marker-${markType.name}`
    });

    const closeMarker = markerType.create({
      kind: markType.name,
      text: fullMatch.slice(innerOffsetInMatch + inner.length),
      className: `marker-${markType.name}`
    });

    // заменяем весь текст (от start до end) на: openMarker + текст + closeMarker
    tr.replaceWith(
      start,
      end,
      [openMarker, state.schema.text(inner, [markType.create(attrs)]), closeMarker]
    );

    return tr;
  });
};
