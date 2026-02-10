import styles from "./index.module.css";

import { Editor } from "@/03-widgets/editor";
import { Path } from "@/03-widgets/path";

const EditPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.editorWrapper}>
        <Path path={["test1", "test2", "test3"]}/>
        <Editor/>
      </div>
    </div>
  )
}

export default EditPage;
