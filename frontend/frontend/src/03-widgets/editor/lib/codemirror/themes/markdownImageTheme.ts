import { EditorView } from "@uiw/react-codemirror";

export const markdownImageTheme = EditorView.theme({
  ".cm-markdown-image": {
    display: "inline-block",
    maxWidth: "min(100%, 48rem)",
    maxHeight: "32rem",
    borderRadius: "4px",
    objectFit: "contain",
    verticalAlign: "middle"
  }
});