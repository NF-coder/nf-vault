import type { MarkType } from "prosemirror-model";
import type { Command } from "prosemirror-state";

import { toggleMark } from "prosemirror-commands";


const handleMarkToggle = (
  markType: MarkType,
  executeCommand: (cmd: Command) => void
) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand(toggleMark(markType));
  };
};