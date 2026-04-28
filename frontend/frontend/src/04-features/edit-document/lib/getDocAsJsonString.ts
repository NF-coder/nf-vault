import type { EditorState } from "prosemirror-state";

export const getDocAsJsonString = (state: EditorState): object => {
  return state.doc.toJSON();
}