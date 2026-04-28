import { redo, undo } from "prosemirror-history";
import { chainCommands, exitCode, toggleMark, wrapIn } from "prosemirror-commands";

import { Schema } from 'prosemirror-model';
import { KeymapConfigObj } from "./utils/KeymapConfigBuilder";

import { splitListItem, liftListItem, sinkListItem } from "prosemirror-schema-list"

import { undoInputRule } from "prosemirror-inputrules"
import { smartBackspace } from "./components/SmartBackspace";
import { ArrowRight } from "./components/ArrowRight";
import { ArrowLeft } from "./components/ArrowLeft";

export const historyPluginKeymap: KeymapConfigObj = {
  "Mod-z": undo,
  "Mod-Shift-z": undoInputRule,
  "Mod-y": redo,
}

export const betterBackspace: KeymapConfigObj = {
  "Backspace": smartBackspace,
}

export const betterArrows: KeymapConfigObj = {
  //"ArrowRight": ArrowRight,
  //"ArrowLeft": ArrowLeft
}

export const createTextFormattingKeymap = (schema: Schema): KeymapConfigObj => {
  const cmd = chainCommands(exitCode, (state, dispatch) => {
    if (dispatch) dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView())
    return true
  })
  
  return {
    "Mod-i": toggleMark(schema.marks.em),
    "Mod-b": toggleMark(schema.marks.strong),
    "Mod-Shift-c": toggleMark(schema.marks.code),

    "Ctrl->": wrapIn(schema.nodes.blockquote),

    "Mod-Enter": cmd,
    "Shift-Enter": cmd,

    "Enter": splitListItem(schema.nodes.list_item),
    "Mod-[": liftListItem(schema.nodes.list_item),
    "Mod-]": sinkListItem(schema.nodes.list_item),
  }
}