import { highlightingFor, syntaxTree } from "@codemirror/language";
import { Decoration, EditorView } from "@uiw/react-codemirror";
import type { DecorationSet, Range } from "@uiw/react-codemirror";
import type { Tag } from "@lezer/highlight";
import { markdownSourceMarkerTag } from "../../themes";
import { MarkdownMarkerWidget } from "./MarkdownMarkerWidget";
import { markerRules, type MarkerReplacementResolver } from "./markerRules";

type MarkerNode = {
  name: string;
  node: {
    parent: {
      name: string;
      from: number;
      to: number;
    } | null;
  };
};

const isSelectionInside = (
  view: EditorView,
  from: number,
  to: number,
) => {
  if (!view.hasFocus) return false;

  return view.state.selection.ranges.some((range) => {
    return range.from <= to && range.to >= from;
  });
};

const getMarkerContext = (node: MarkerNode) => {
  const rule = markerRules[node.name];
  const owner = node.node.parent;

  if (!rule || !owner || !rule.ownerNames.includes(owner.name)) {
    return null;
  }

  return { owner, rule };
};

const getHighlightClass = (view: EditorView, tag: Tag) => {
  return highlightingFor(view.state, [tag]) ?? "";
};

const getMarkerReplacement = (
  view: EditorView,
  node: { from: number; to: number },
  replacementResolver?: MarkerReplacementResolver,
) => {
  if (!replacementResolver) return Decoration.replace({});

  const sourceMarker = view.state.doc.sliceString(node.from, node.to);
  const widgetText = replacementResolver(sourceMarker);
  const className = getHighlightClass(view, markdownSourceMarkerTag);

  return Decoration.replace({
    widget: new MarkdownMarkerWidget(widgetText, className),
  });
};

const getMarkerEnd = (
  view: EditorView,
  node: { to: number },
  consumesSeparator = false,
) => {
  if (
    consumesSeparator
    && /^[ \t]$/.test(view.state.doc.sliceString(node.to, node.to + 1))
  ) {
    return node.to + 1;
  }

  return node.to;
};

export const buildDecorations = (view: EditorView): DecorationSet => {
  const decorations: Array<Range<Decoration>> = [];

  syntaxTree(view.state).iterate({
    enter(node) {
      const marker = getMarkerContext(node);
      if (!marker || node.from >= node.to) return;

      const isOwnerActive = isSelectionInside(
        view,
        marker.owner.from,
        marker.owner.to,
      );

      if (!isOwnerActive) {
        decorations.push(
          getMarkerReplacement(
            view,
            node,
            marker.rule.replacementResolver,
          ).range(
            node.from,
            getMarkerEnd(view, node, marker.rule.consumesSeparator),
          ),
        );
      }

      if (isOwnerActive && marker.rule.isSourceMarker) {
        decorations.push(
          Decoration.mark({
            class: getHighlightClass(view, markdownSourceMarkerTag),
          }).range(node.from, node.to),
        );
      }
    },
  });

  return Decoration.set(decorations, true);
};
