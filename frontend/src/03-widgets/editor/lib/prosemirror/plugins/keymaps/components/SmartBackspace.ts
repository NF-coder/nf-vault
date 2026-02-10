import { deleteSelection } from "prosemirror-commands";

import {undoInputRule} from "prosemirror-inputrules"
import { EditorState, Transaction } from "prosemirror-state";

export const smartBackspace = (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
  const { $from, empty } = state.selection;

  // If selection is not empty, use default delete behavior
  if (!empty) return deleteSelection(state, dispatch);

  // Check if we're at the start of a text block
  if ($from.parentOffset === 0) {
    const parent = $from.parent;
    const nodeBefore = $from.nodeBefore;

    // Trying to convert it to paragraph
    if (parent.type !== state.schema.nodes.paragraph) {
      if (dispatch) {
        const tr = state.tr.setBlockType(
          $from.before(), 
          $from.after(), 
          state.schema.nodes.paragraph
        );
        dispatch(tr);
        return true;
      }
    }

    // Handle stored marks
    if (state.storedMarks?.length) {
      if (dispatch) {
        let tr = state.tr;
        state.storedMarks.forEach(mark => {
          tr = tr.removeStoredMark(mark.type);
        });
        dispatch(tr);
      }
      return true;
    }
    
    // Try to merge with previous block
    if (nodeBefore && nodeBefore.type.isBlock) {
      if (dispatch) {
        const joinPos = $from.before();
        dispatch(state.tr.delete(joinPos, $from.pos).scrollIntoView());
      }
      return true;
    }
  }
  
  // Try input rule undo first
  if (undoInputRule(state, dispatch)) return true;
  
  // Fallback: delete one character to the left
  if ($from.pos > 0) {
    if (dispatch) {
      const tr = state.tr.delete($from.pos - 1, $from.pos).scrollIntoView();
      dispatch(tr);
    }
    return true;
  }

  return false;
}