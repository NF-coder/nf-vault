import { CreateDocument } from "@/04-features/create-document-popup";
import { useState } from "react";
import styles from "./index.module.css"

type props = {
  onProcessFinished?: () => void
}

export const CreateDocumentButton = (  {
    onProcessFinished = () => {}
  } : props
) => {
  const [isShown, setShown] = useState(false);

  return (
    <>
      <p className={styles.optionName} onClick={() => setShown(true)}>New Document</p>
      <CreateDocument
        isOpen={isShown}
        onClose={() => {setShown(false); onProcessFinished()}}
        onSuccess={() => {setShown(false); onProcessFinished()}}
      />
    </>
  )
}