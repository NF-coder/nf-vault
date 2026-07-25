import { markdown } from "@codemirror/lang-markdown";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { markdownWysiwygPlugin } from "../plugins";
import { markdownEditorTheme } from "../themes";

export type EditorConfig = Pick<
  ReactCodeMirrorProps,
  "extensions" | "theme" | "placeholder" | "basicSetup"
>;

export const editorConfig: EditorConfig = {
  extensions: [markdown(), markdownWysiwygPlugin],
  theme: markdownEditorTheme,
  placeholder: "Your text",
  basicSetup: {
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLineGutter: false,
  },
};
