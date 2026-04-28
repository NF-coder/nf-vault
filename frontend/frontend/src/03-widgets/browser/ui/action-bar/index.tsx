import styles from "./index.module.css"
import { CreateFileButton } from "../create-file-button";


export const ActionBar = () => {
  return (
    <div className={styles.container}>
      <CreateFileButton/>
    </div>
  );
};