import { markdown } from "@codemirror/lang-markdown";
import { languages as codeLanguages } from "@codemirror/language-data";
import { EditorView } from "@uiw/react-codemirror";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { pasteImagePlugin } from "@/04-features/paste-image";
import { markdownWysiwygPlugin } from "../plugins";
import { codeBlockTheme, markdownEditorTheme, markdownImageActionsTheme, markdownImageTheme } from "../themes";

export type EditorConfig = Pick<
  ReactCodeMirrorProps,
  "extensions" | "theme" | "placeholder" | "basicSetup"
>;

export const editorConfig: EditorConfig = {
  extensions: [
    markdown({ codeLanguages }),
    EditorView.lineWrapping,
    markdownWysiwygPlugin,
    pasteImagePlugin,
    markdownImageTheme,
    markdownImageActionsTheme,
    codeBlockTheme
  ],
  theme: markdownEditorTheme,
  placeholder: "Your text",
  basicSetup: {
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLineGutter: false
  }
};