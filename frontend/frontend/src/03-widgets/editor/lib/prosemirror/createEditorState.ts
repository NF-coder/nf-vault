import { EditorState, type Plugin } from "prosemirror-state";
import type { Node, Schema } from "prosemirror-model";
import { MarkdownParser, defaultMarkdownParser } from "prosemirror-markdown";

// Prosemirror Plugins
import { history } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";
import { gapCursor } from "prosemirror-gapcursor";
import { dropCursor } from "prosemirror-dropcursor";
import { reactKeys } from "@handlewithcare/react-prosemirror";
import { tagHighlighterPlugin } from "./plugins/showMarkersPlugin/ShowMarkersPlugin";
import placeholderPlugin from "./plugins/placeholder/PlaceholderPlugin";
import codemark from 'prosemirror-codemark';

// some unsorted shit
import { buildInputRules } from "./plugins/inputRules/InputRules";
import KeymapPluginBuilder from "./plugins/keymaps/utils/KeymapConfigBuilder";
import { betterArrows, betterBackspace, createTextFormattingKeymap, historyPluginKeymap } from "./plugins/keymaps/Keymaps";
import { createDevToolsPlugin } from "./plugins/devToolsPlugin/devToolsPlugin";
import { stickyArrowsPlugin } from "./plugins/stickyArrowsPlugin/StickyArrowsPlugin";
/*import { markerDeletionPlugin } from "./plugins/exp/T1";
import { floatingMarkerPlugin } from "./plugins/exp/T2";
import { dynamicMarkerPlugin } from "./plugins/exp/T3";*/


const initEditorState = (
  schema: Schema<any, any>,
  doc: Node | undefined,
  ...plugins: readonly Plugin<any>[]
): EditorState => {
  return EditorState.create({
    schema,
    doc,
    plugins: plugins
  })
}

const createDocFromMarkdown = (
  schema: Schema,
  content: string,
): Node => {
  const parser = new MarkdownParser(
    schema,
    defaultMarkdownParser.tokenizer,
    defaultMarkdownParser.tokens,
  );

  return parser.parse(content);
}

export const createEditorState = (
  schema: Schema,
  content = "",
): EditorState => {
  const plugins = [
    history(),
    stickyArrowsPlugin,
    placeholderPlugin("Your text"),
    reactKeys(),
    new KeymapPluginBuilder().addKeymap(baseKeymap).build(),
    new KeymapPluginBuilder()
      .addKeymap(historyPluginKeymap)
      .addKeymap(createTextFormattingKeymap(schema))
      .build(),
    new KeymapPluginBuilder().addKeymap(betterBackspace).build(),
    //new KeymapPluginBuilder().addKeymap(betterArrows).build(), // Depreacated
    buildInputRules(schema),
    dropCursor(),
    gapCursor(),
    //markerDeletionPlugin,
    //floatingMarkerPlugin,
    //tagHighlighterPlugin,
    //dynamicMarkerPlugin,
    ...codemark({ markType: schema.marks.code })
  ];

  if (process.env.NODE_ENV === "development") {
    plugins.push(createDevToolsPlugin());
  }

  return initEditorState(schema, createDocFromMarkdown(schema, content), ...plugins);
}
