import styles from "./index.module.css";

import { Editor } from "@/03-widgets/editor";
import { Path } from "@/03-widgets/path";
import { Topbar } from "@/03-widgets/topbar";
import { Navigate, useParams } from "react-router";

const EditPage = () => {
  const { docId } = useParams();
  const documentId = Number(docId);

  if (!Number.isInteger(documentId)) {
    return <Navigate to="/tree" replace/>;
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar/>
      <div className={styles.editorWrapper}>
        <Path path={["test1", "test2", "test3"]}/>
        <Editor documentId={documentId}/>
      </div>
    </div>
  )
}

export default EditPage;
