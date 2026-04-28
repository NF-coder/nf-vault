import { DropdownMenu } from "@/06-shared/ui/dropdown-menu"
import { CreateDirectoryButton } from "./create-directory-button"
import { CreateDocumentButton } from "./create-document-button"
import { RefObject } from "react";
import styles from "./index.module.css"

type props = {
  isShown: boolean
  setShown: (shown: boolean) => void
  buttonRef?: RefObject<HTMLElement | null>
}

export const CreateFileDropdown = (
  {
    isShown,
    setShown,
    buttonRef
  } : props
) => {
  return isShown ?  (
    <DropdownMenu onClose={() => setShown(false)} buttonRef={buttonRef}>
      <div className={styles.wrapper}>
        <CreateDirectoryButton onProcessFinished={() => setShown(false)}/>
        <CreateDocumentButton onProcessFinished={() => setShown(false)}/>
      </div>
    </DropdownMenu>
  ): null
}