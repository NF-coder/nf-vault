import styles from "./index.module.css"
import { File } from "./file"
import { ActionBar } from "./action-bar"
import { getDocuments, type DocumentListItem } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Browser = () => {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const showError = useNotifyError();
  const navigate = useNavigate();

  const loadDocuments = async () => {
    try {
      setDocuments(await getDocuments());
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div className={styles.browserContainer}>
      <ActionBar onProcessFinished={loadDocuments}/>
      {documents.map((document) => {       
        return (
          <File
            key={document.id}
            name={document.title}
            type={document.type}
            onClick={
              document.type === "document"
                ? () => navigate(`/edit/${document.id}`)
                : undefined
            }
          />
        );
      })}
    </div>
  )
}
