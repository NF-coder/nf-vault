import { Decoration } from "@uiw/react-codemirror";
import type { Range } from "@uiw/react-codemirror";
import type { DecorationProvider } from "../../types";
import { isSelectionInside } from "../../util/isSelectionInside";

const CODE_BLOCK_LINE_CLASS = "cm-markdown-code-block-line";

export const getCodeBlockDecorations: DecorationProvider = (view, node) => {
  if (node.name !== "FencedCode") return { decorations: [] };

  const doc = view.state.doc;
  const firstLine = doc.lineAt(node.from);
  const lastLine = doc.lineAt(Math.max(node.from, node.to - 1));
  const isActive = isSelectionInside(view, node);
  const infoNode = node.node.getChild("CodeInfo");
  const language = infoNode
    ? doc.sliceString(infoNode.from, infoNode.to).trim()
    : "";
  const decorations: Array<Range<Decoration>> = [];

  for (let lineNumber = firstLine.number; lineNumber <= lastLine.number; lineNumber++) {
    const line = doc.line(lineNumber);
    const classes = [CODE_BLOCK_LINE_CLASS];

    if (lineNumber === firstLine.number) {
      classes.push(`${CODE_BLOCK_LINE_CLASS}-start`);
    }
    if (lineNumber === lastLine.number) {
      classes.push(`${CODE_BLOCK_LINE_CLASS}-end`);
    }

    const attributes: Record<string, string> = {
      class: classes.join(" ")
    };
    
    if (lineNumber === firstLine.number && language && !isActive) {
      attributes["data-code-language"] = language;
    }

    decorations.push(Decoration.line({ attributes }).range(line.from));
  }

  return { decorations };
};