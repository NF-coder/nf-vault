import styles from "./index.module.css"
import { File } from "./file"
import { ActionBar } from "./action-bar"
import { DeleteTreeNodePopup } from "@/04-features/delete-tree-node-popup";
import { RenameTreeNodePopup } from "@/04-features/rename-tree-node-popup";
import { getDocuments, type DocumentListItem } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type props = {
  parentId?: number | null
}

export const Browser = (
  {
    parentId = null,
  }: props
) => {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const showError = useNotifyError();
  const navigate = useNavigate();

  const loadDocuments = async () => {
    try {
      setDocuments(await getDocuments({ parentId }));
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [parentId]);

  return (
    <div className={styles.browserContainer}>
      <ActionBar parentId={parentId} onProcessFinished={loadDocuments}/>
      <div className={styles.browserHeader}>
        <span>type</span>
        <span>name</span>
        <span>actions</span>
      </div>
      <div className={styles.fileList}>
        {documents.length === 0 ? (
          <div className={styles.emptyState}>
            <span>-- empty directory --</span>
          </div>
        ) : null}
        {documents.map((document, idx) => {       
          return (
            <File
              key={document.id}
              name={document.title}
              type={document.type}
              onClick={
                document.type === "document"
                  ? () => navigate(`/edit/${document.id}`)
                  : () => navigate(`/tree/${document.id}`)
              }
              actions={
                <>
                  <RenameTreeNodePopup
                    document={document}
                    onProcessFinished={loadDocuments}
                  />
                  <DeleteTreeNodePopup
                    document={document}
                    onProcessFinished={loadDocuments}
                  />
                </>
              }
            />
          );
        })}
      </div>
    </div>
  )
}
