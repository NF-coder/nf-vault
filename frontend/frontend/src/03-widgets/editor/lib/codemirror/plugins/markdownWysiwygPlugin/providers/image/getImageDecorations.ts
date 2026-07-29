import { Decoration } from "@uiw/react-codemirror";
import type { DecorationProvider } from "../../types";
import { isSelectionInside } from "../../util/isSelectionInside";
import { MarkdownImageWidget } from "./MarkdownImageWidget";

const unwrapImageText = (text: string) => {
  return text.replace(/\\([\\\]])/g, "$1");
};

export const getImageDecorations: DecorationProvider = (view, node) => {
  if (node.name !== "Image" || isSelectionInside(view, node)) {
    return { decorations: [] };
  }

  const urlNode = node.node.getChild("URL");
  if (!urlNode) return { decorations: [] };

  const source = view.state.doc.sliceString(urlNode.from, urlNode.to);
  const imageSource = view.state.doc.sliceString(node.from, node.to);
  const altEnd = imageSource.indexOf("](");
  const alt = altEnd >= 0
    ? unwrapImageText(imageSource.slice(2, altEnd))
    : "image";
  const titleNode = node.node.getChild("LinkTitle");
  const titleSource = titleNode
    ? view.state.doc.sliceString(titleNode.from, titleNode.to)
    : null;
  const title = titleSource?.slice(1, -1) ?? null;

  const decoration = Decoration.replace({
    widget: new MarkdownImageWidget(source, alt, title)
  });

  return {
    decorations: [decoration.range(node.from, node.to)],
    skipChildren: true
  };
};