import styles from "./index.module.css";

import type { EditorState } from "prosemirror-state";
import type { Schema, MarkType } from "prosemirror-model";

import { TopbarButton } from "@/06-shared/ui/buttons/TopbarButton";
import { useMarks } from "../lib/useMarks";


type ButtonConfig = {
  markType: MarkType;
  label: string;
  title: string;
}

type props = {
  state: EditorState;
  runCommand: (cmd: (state: EditorState, dispatch?: any) => boolean) => void;
  topbarButtons: ButtonConfig[];
  isReadOnly?: boolean;
  onToggleReadOnly?: () => void;
}


const EditorTopbar = ({
  state,
  runCommand,
  topbarButtons,
  isReadOnly = false,
  onToggleReadOnly = () => {}
}: props) => {
  const { $from } = state.selection;
  const node = $from.parent;
  const nodeName = node.type.name;
  const headingLevel = nodeName === "heading" ? node.attrs.level : null;

  const { activeMarks, handleMarkToggle } = useMarks(state, runCommand);

  return (
    <div className={styles['pm-topbar']}>
      <TopbarButton
        handleClick={() => onToggleReadOnly()}
        title={"Read Only"}
        isActive={isReadOnly}
      >
        {"L"}
      </TopbarButton>

      <div className={styles['pm-block']}>
        {nodeName}
        {headingLevel && ` (${headingLevel})`}
      </div>

      <div className={styles['pm-marks']}>
        {topbarButtons.map(({ markType, label, title }) => {
          
          return (
            <TopbarButton
              key={markType.name}
              title={title}
              isActive={activeMarks.has(markType.name)}
              handleClick={handleMarkToggle(markType)}
              isDisabled={isReadOnly}
            >
              {label}
            </TopbarButton>
          );
        })}
      </div>
    </div>
  );
};

export default EditorTopbar;
