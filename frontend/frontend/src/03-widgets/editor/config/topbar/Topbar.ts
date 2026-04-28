import type { TopbarButtonConfig } from "@/04-features/editor-toolbar";
import { schema } from "../../lib/prosemirror/config/constants";


export const topbarButtons: TopbarButtonConfig[] = [
  { markType: schema.marks.strong, label: "B", title: "Bold" },
  { markType: schema.marks.em, label: "I", title: "Italic" },
  { markType: schema.marks.code, label: "</>", title: "Code" },
];
