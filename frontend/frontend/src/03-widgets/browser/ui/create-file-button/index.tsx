import { CreateFileDropdown } from "@/04-features/create-file-dropdown";
import { useState, useRef } from "react";
import styles from "./index.module.css";
import { TopbarButton } from "@/06-shared/ui/buttons";

type props = {
  onProcessFinished?: () => void
}

export const CreateFileButton = (
  {
    onProcessFinished = () => {},
  }: props
) => {
  const [isShown, setShown] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className={styles.container}>
      <div ref={buttonRef} >
        <TopbarButton handleClick={() => setShown(true)}>
          +
        </TopbarButton>
      </div>
      <CreateFileDropdown
        isShown={isShown}
        setShown={setShown}
        buttonRef={buttonRef}
        onProcessFinished={onProcessFinished}
      />
    </div>
  );
};