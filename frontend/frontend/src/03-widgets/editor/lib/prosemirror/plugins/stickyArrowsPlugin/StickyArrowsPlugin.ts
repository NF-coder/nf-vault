import { Plugin } from "prosemirror-state";
import type { Mark } from "prosemirror-model";

export const stickyArrowsPlugin = new Plugin({
  props: {
    handleKeyDown(view, event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return false;
      }

      const { state, dispatch } = view;
      const { selection } = state;
      if (!selection.empty) return false;

      const $pos = selection.$from;
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const targetPos = $pos.pos + direction;
      const $target = state.doc.resolve(targetPos);

      if (targetPos < 0 || targetPos > state.doc.content.size) {
        return false;
      }

      const currentMarks = state.storedMarks || $pos.marks();
      const targetMarks =
        event.key === "ArrowRight"
          ? $pos.marksAcross($target) || []
          : $target.marksAcross($pos) || [];

      if (!sameMarks(currentMarks, targetMarks)) {
        dispatch(state.tr.setStoredMarks(targetMarks));
        event.preventDefault();
        return true;
      }

      return false;
    },
  },
});

const sameMarks = (a: readonly Mark[], b: readonly Mark[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every(m => b.includes(m));
}
