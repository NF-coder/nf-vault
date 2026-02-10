import { Mark, ResolvedPos } from "prosemirror-model";
import { EditorState, TextSelection, Transaction } from "prosemirror-state";
/*
const handleArrowRightAtMarkEnd = (
  state: EditorState, 
  $from: ResolvedPos, 
  dispatch?: (tr: Transaction) => void
): boolean => {
  const nodeAfter = $from.nodeAfter;
  const currentMarks = state.storedMarks || $from.marks();
  
  if (nodeAfter && nodeAfter.isText && nodeAfter.marks.length !== 0) {
    // Если есть текст за курсором, то проверяем отличается ли стиль
    if (sameMarks(currentMarks, nodeAfter.marks)) return false
  }
  else if (currentMarks.length !== 0 || $from.pos === $from.end()) {}// Если текста нет, но мы в конце ноды
  else return false;

  if (dispatch) {
    const tr = state.tr;
    tr.setStoredMarks([]);
    dispatch(tr.scrollIntoView());
  }
  return true;
};*/


const handleArrowRightAtMarkStart = (
  state: EditorState, 
  $from: ResolvedPos, 
  dispatch?: (tr: Transaction) => void
): boolean => {
  const nodeAfter = $from.nodeAfter;
  const currentMarks = state.storedMarks || $from.marks();
  
  if (!nodeAfter || !nodeAfter.isText ) return false;
  if (sameMarks(currentMarks, nodeAfter.marks)) return false;
  
  console.log("HARAMS reached")

  if (dispatch) {
    const tr = state.tr;
    tr.setStoredMarks(nodeAfter.marks);
    dispatch(tr.scrollIntoView());
  }
  return true;
};

const sameMarks = (a: readonly Mark[], b: readonly Mark[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every(m => b.includes(m));
}

export const ArrowRight = (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
  const { selection } = state;
  if (!(selection instanceof TextSelection) || !selection.empty) return false;
  const { $from } = selection;
  
  if(handleArrowRightAtMarkStart(state, $from, dispatch)) return true;
  
  //if (handleArrowRightAtMarkEnd(state, $from, dispatch)) return true;

  return false;
};