import { markdown } from "@codemirror/lang-markdown";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { pasteImagePlugin } from "@/04-features/paste-image";
import { markdownWysiwygPlugin } from "../plugins";
import { markdownEditorTheme, markdownImageTheme } from "../themes";

export type EditorConfig = Pick<
  ReactCodeMirrorProps,
  "extensions" | "theme" | "placeholder" | "basicSetup"
>;

export const editorConfig: EditorConfig = {
  extensions: [
    markdown(),
    markdownWysiwygPlugin,
    pasteImagePlugin,
    markdownImageTheme
  ],
  theme: markdownEditorTheme,
  placeholder: "Your text",
  basicSetup: {
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLineGutter: false
  }
};