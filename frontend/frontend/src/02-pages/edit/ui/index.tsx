import styles from "./index.module.css";

import { Editor } from "@/03-widgets/editor";
import { Path } from "@/03-widgets/path";
import { Topbar } from "@/03-widgets/topbar";

const EditPage = () => {
  const docIdx = 0;

  return (
    <div className={styles.pageWrapper}>
      <Topbar/>
      <div className={styles.editorWrapper}>
        <Path path={["test1", "test2", "test3"]}/>
        <Editor documentId={docIdx}/>
      </div>
    </div>
  )
}

export default EditPage;
