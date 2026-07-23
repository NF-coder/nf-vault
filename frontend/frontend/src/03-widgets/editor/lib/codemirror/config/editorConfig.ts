import { markdown } from "@codemirror/lang-markdown";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";

export type EditorConfig = Pick<
  ReactCodeMirrorProps,
  "extensions" | "theme" | "placeholder" | "basicSetup"
>;

export const editorConfig: EditorConfig = {
  extensions: [markdown()],
  theme: "dark",
  placeholder: "Your text",
  basicSetup: {
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLineGutter: false,
  },
};
