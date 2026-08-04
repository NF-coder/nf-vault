import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@uiw/react-codemirror";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { pasteImagePlugin } from "@/04-features/paste-image";
import { markdownWysiwygPlugin } from "../plugins";
import { markdownEditorTheme, markdownImageTheme, markdownImageActionsTheme } from "../themes";

export type EditorConfig = Pick<
  ReactCodeMirrorProps,
  "extensions" | "theme" | "placeholder" | "basicSetup"
>;

export const editorConfig: EditorConfig = {
  extensions: [
    markdown(),
    EditorView.lineWrapping,
    markdownWysiwygPlugin,
    pasteImagePlugin,
    markdownImageTheme,
    markdownImageActionsTheme
  ],
  theme: markdownEditorTheme,
  placeholder: "Your text",
  basicSetup: {
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLineGutter: false
  }
};