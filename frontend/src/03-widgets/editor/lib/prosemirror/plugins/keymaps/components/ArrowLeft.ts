import { EditorState, TextSelection, Transaction } from "prosemirror-state";
import { Mark, ResolvedPos } from "prosemirror-model";

const handleArrowLeftAtMarkStart = (
  state: EditorState, 
  $from: ResolvedPos, 
  dispatch?: (tr: Transaction) => void
): boolean => {
  const nodeBefore = $from.nodeBefore;
  const currentMarks = state.storedMarks || $from.marks();

  if (!nodeBefore || !nodeBefore.isText || nodeBefore.marks.length === 0) return false;
  if (sameMarks(currentMarks, nodeBefore.marks)) return false;

  console.log("handleArrowLeftAtMarkStart")
  
  if (dispatch) {
    const tr = state.tr;
    tr.setStoredMarks(currentMarks);
    dispatch(tr.scrollIntoView());
  }
  return true;
};

const handleArrowLeftAtMarkEnd = (
  state: EditorState, 
  $from: ResolvedPos, 
  dispatch?: (tr: Transaction) => void
): boolean => {
  const nodeBefore = $from.nodeBefore;
  const currentMarks = state.storedMarks || $from.marks();
  
  if (!nodeBefore || !nodeBefore.isText || nodeBefore.marks.length === 0) return false;
  if (sameMarks(currentMarks, nodeBefore.marks)) return false;
  
  console.log("handleArrowLeftAtMarkEnd:", nodeBefore.marks)

  if (dispatch) {
    const tr = state.tr;
    tr.setStoredMarks(nodeBefore.marks);
    dispatch(tr.scrollIntoView());
  }
  return true;
};

const sameMarks = (a: readonly Mark[], b: readonly Mark[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every(m => b.includes(m));
}

export const ArrowLeft = (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
  const { selection } = state;
  if (!(selection instanceof TextSelection) || !selection.empty) return false;
  const { $from } = selection;
  
  if (handleArrowLeftAtMarkEnd(state, $from, dispatch)) return true;
  if (handleArrowLeftAtMarkStart(state, $from, dispatch)) return true;

  return false;
};