import type { EditorState } from "prosemirror-state";
import type { MarkType } from "prosemirror-model";
import { toggleMark } from "prosemirror-commands";

import { useEffect, useState } from "react";


export const useMarks = (
  state: EditorState,
  runCommand: (cmd: (state: EditorState, dispatch?: any) => boolean) => void
) => {
  const { $from } = state.selection;
  
  const marks = state.storedMarks || $from.marks();
  const [activeMarks, setActiveMarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    setActiveMarks(new Set(marks.map((m) => m.type.name)));
  }, [marks, state, state.selection]);

  const handleMarkToggle = (markType: MarkType) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      runCommand(toggleMark(markType));
    };
  };

  return {
    activeMarks,
    handleMarkToggle
  }
}