import { EditorState, Plugin, Transaction } from "prosemirror-state";
import { DecorationSet, Decoration, EditorView } from "prosemirror-view";
import { MarkType, ResolvedPos, Mark, Node as PMNode } from "prosemirror-model";

type MarkerInfo = {
  start: string;
  end: string;
  className: string;
}

const MARKERS: Record<string, MarkerInfo> = {
  strong: { start: "__", end: "__", className: "marker-strong" },
  em: { start: "*", end: "*", className: "marker-em" },
  code: { start: "`", end: "`", className: "marker-code" },
};

export const tagHighlighterPlugin = new Plugin({
  state: {
    init(_: any, _state: EditorState): DecorationSet {
      return DecorationSet.empty;
    },
    apply(
      _tr: Transaction,
      decorationSet: DecorationSet,
      _oldState: EditorState,
      newState: EditorState
    ): DecorationSet {
      const decorations: Decoration[] = [];
      
      const { $from, empty } = newState.selection;
      if (!$from) return DecorationSet.create(newState.doc, decorations);
      if (!empty) return DecorationSet.create(newState.doc, decorations);

      // Active marks at the cursor position
      const activeMarks = newState.storedMarks || $from.marks();
      //console.log(activeMarks)

      activeMarks.forEach((mark: Mark) => {
        const markerInfo = MARKERS[mark.type.name];
        if (!markerInfo) return;

        const range = findMarkRange($from, mark.type);
        if (!range) return;

        let { from, to } = range;
        // clamp positions to document bounds
        const docSize = newState.doc.content.size;
        from = Math.max(0, Math.min(from, docSize));
        to = Math.max(0, Math.min(to, docSize));

        // Widget at the start of the marked range
        decorations.push(
          Decoration.widget(from, () => {
            const span = document.createElement("span");
            span.className = `${markerInfo.className} marker-start`;
            span.textContent = markerInfo.start;
            return span;
          }, { side: -1 })
        );

        // Widget at the end of the marked range
        decorations.push(
          Decoration.widget(to, () => {
            const span = document.createElement("span");
            span.className = `${markerInfo.className} marker-end`;
            span.textContent = markerInfo.end;
            return span;
          }, { side: 1 })
        );
      });

      // Block-level markers (e.g., headings)
      const node = $from.parent;
      if (node.type.name === "heading") {
        const level = (node.attrs && (node.attrs.level as number)) || 1;
        const headingMarker = "#".repeat(level) + " ";
        const posBefore = $from.before();
        decorations.push(
          Decoration.widget(posBefore, () => {
            const span = document.createElement("span");
            span.className = "marker-heading";
            span.textContent = headingMarker;
            return span;
          }, { side: -1 })
        );
      }

      return DecorationSet.create(newState.doc, decorations);
    },
  },
  props: {
    decorations(this: Plugin, state: EditorState) {
      return (this.getState(state) as DecorationSet) || DecorationSet.empty;
    },
  },
});

const findMarkRange = (
  $pos: ResolvedPos,
  markType: MarkType
): { from: number; to: number } | null => {
  if (!$pos || !markType) return null;

  // Use ProseMirror's built-in method to find the mark range
  // This is more reliable than manual traversal
  let start = $pos.pos;
  let end = $pos.pos;
  
  // Expand backwards to find the start of the mark
  while (start >= 0) {
    const $prev = $pos.doc.resolve(start);
    if (!$prev.marks().some(m => m.type === markType)) break;
    start--;
  }
  
  // Expand forwards to find the end of the mark
  while (end < $pos.doc.content.size) {
    const $next = $pos.doc.resolve(end + 1);
    if (!$next.marks().some(m => m.type === markType)) break;
    end++;
  }

  // If we didn't find a valid range, return null
  if (start >= end) return null;

  return { from: start, to: end };
};