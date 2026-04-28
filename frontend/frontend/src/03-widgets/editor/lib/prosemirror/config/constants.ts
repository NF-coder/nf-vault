import { Schema } from "prosemirror-model";
import { schema as markdownSchema } from "prosemirror-markdown";
import { markerNodeSpec } from "./markers/inlineMarkerSpec";

export const schema = new Schema({
  nodes: markdownSchema.spec.nodes.addToEnd("marker", markerNodeSpec),
  marks: markdownSchema.spec.marks,
});
