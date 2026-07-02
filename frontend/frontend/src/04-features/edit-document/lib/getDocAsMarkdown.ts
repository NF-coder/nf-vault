import type { EditorState } from "prosemirror-state";
import { MarkdownSerializer, defaultMarkdownSerializer } from "prosemirror-markdown";

const markdownSerializer = new MarkdownSerializer(
  {
    ...defaultMarkdownSerializer.nodes,
    marker(state, node) {
      state.text(String(node.attrs.text ?? ""), false);
    },
  },
  defaultMarkdownSerializer.marks
);

export const getDocAsMarkdown = (state: EditorState): string => {
  return markdownSerializer.serialize(state.doc);
};
