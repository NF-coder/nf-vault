import { EditorView } from "@uiw/react-codemirror";

export const markdownImageTheme = EditorView.theme({
  ".cm-markdown-image": {
    display: "inline-block",
    maxWidth: "min(100%, 48rem)",
    maxHeight: "32rem",
    margin: "0.35em 0",
    borderRadius: "4px",
    objectFit: "contain",
    verticalAlign: "middle"
  }
});