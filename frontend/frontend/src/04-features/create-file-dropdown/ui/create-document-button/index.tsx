import { CreateDocument } from "@/04-features/create-document-popup";
import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./index.module.css"

type props = {
  parentId?: number | null
  onProcessFinished?: () => void
}

export const CreateDocumentButton = (  {
    parentId = null,
    onProcessFinished = () => {}
  } : props
) => {
  const [isShown, setShown] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <p className={styles.optionName} onClick={() => setShown(true)}>New Document</p>
      <CreateDocument
        isOpen={isShown}
        parentId={parentId}
        onClose={() => {setShown(false); onProcessFinished()}}
        onSuccess={(documentId) => {setShown(false); navigate(`/edit/${documentId}`)}}
      />
    </>
  )
}