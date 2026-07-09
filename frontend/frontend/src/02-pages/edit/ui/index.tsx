import styles from "./index.module.css";

import { Editor } from "@/03-widgets/editor";
import { Path, type PathItem } from "@/03-widgets/path";
import { Topbar } from "@/03-widgets/topbar";
import { getDocumentPath } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

const EditPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const showError = useNotifyError();
  const documentId = Number(docId);
  const [path, setPath] = useState<PathItem[]>([]);

  useEffect(() => {
    if (!Number.isInteger(documentId)) {
      return;
    }

    let isActive = true;

    const loadPath = async () => {
      try {
        const documentPath = await getDocumentPath({ docId: documentId });
        if (!isActive) return;

        setPath(documentPath);
      } catch (error) {
        if (!isActive) return;

        showError(error);
      }
    };

    loadPath();

    return () => {
      isActive = false;
    };
  }, [documentId]);

  if (!Number.isInteger(documentId)) {
    return <Navigate to="/tree" replace/>;
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar/>
      <div className={styles.editorWrapper}>
        <Path
          path={path}
          onNavigate={(id) => {
            if (id === null) {
              navigate("/tree");
              return;
            }

            const item = path.find((pathItem) => pathItem.id === id);
            navigate(item?.type === "document" ? `/edit/${id}` : `/tree/${id}`);
          }}
        />
        <Editor documentId={documentId}/>
      </div>
    </div>
  )
}

export default EditPage;
