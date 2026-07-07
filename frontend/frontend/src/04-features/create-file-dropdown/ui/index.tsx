import { DropdownMenu } from "@/06-shared/ui/dropdown-menu"
import { CreateDirectoryButton } from "./create-directory-button"
import { CreateDocumentButton } from "./create-document-button"
import { RefObject } from "react";
import styles from "./index.module.css"

type props = {
  isShown: boolean
  setShown: (shown: boolean) => void
  buttonRef?: RefObject<HTMLElement | null>
  onProcessFinished?: () => void
}

export const CreateFileDropdown = (
  {
    isShown,
    setShown,
    buttonRef,
    onProcessFinished = () => {},
  } : props
) => {
  return isShown ?  (
    <DropdownMenu onClose={() => setShown(false)} buttonRef={buttonRef}>
      <div className={styles.wrapper}>
        <CreateDirectoryButton onProcessFinished={() => {setShown(false); onProcessFinished()}}/>
        <CreateDocumentButton onProcessFinished={() => {setShown(false); onProcessFinished()}}/>
      </div>
    </DropdownMenu>
  ): null
}