import { NodeSpec } from 'prosemirror-model';

export type MarkerAttrs = {
  kind: "strong" | "em" | "code";
  text: string;
  className: string;
};

export const markerNodeSpec: NodeSpec = {
  inline: true,
  group: "inline",
  atom: true,
  selectable: false,
  draggable: false,

  attrs: {
    kind: {},       // "strong" | "em" | "code"
    text: {},       // "__" | "*" | "`"
    className: {},  // "marker-strong" etc
  },

  toDOM(node) {
    return [
      "span",
      {
        class: node.attrs.className,
        "data-marker-kind": node.attrs.kind,
      },
      node.attrs.text,
    ];
  },

  parseDOM: [
    {
      tag: "span[data-marker-kind]",
      getAttrs(dom: HTMLElement) {
        return {
          kind: dom.dataset.markerKind,
          text: dom.textContent,
          className: dom.className,
        };
      },
    },
  ],
};
