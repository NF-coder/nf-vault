import { syntaxTree } from "@codemirror/language";
import { ViewPlugin } from "@uiw/react-codemirror";
import type { DecorationSet, EditorView, ViewUpdate } from "@uiw/react-codemirror";
import { buildDecorations } from "./buildDecorations";

class MarkdownWysiwygView {
  decorations: DecorationSet;

  constructor(view: EditorView) {
    this.decorations = buildDecorations(view);
  }

  update(update: ViewUpdate) {
    const syntaxTreeChanged =
      syntaxTree(update.startState) !== syntaxTree(update.state);

    if (
      update.docChanged
      || update.selectionSet
      || update.viewportChanged
      || update.focusChanged
      || syntaxTreeChanged
    ) {
      this.decorations = buildDecorations(update.view);
    }
  }
}

export const markdownWysiwygPlugin = ViewPlugin.fromClass(MarkdownWysiwygView, {
  decorations: (value) => value.decorations,
});