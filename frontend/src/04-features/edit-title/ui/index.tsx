import styles from "./index.module.css"

type props = {
  readOnly?: boolean
}

const EditorTitle = ({ readOnly = false }: props) => {
  return (
    <input
      placeholder="Title"
      className={styles.title}
      readOnly={readOnly}
      disabled={readOnly}
    ></input>
  );
}

export default EditorTitle;
