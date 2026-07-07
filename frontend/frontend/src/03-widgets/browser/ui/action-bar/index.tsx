import styles from "./index.module.css"
import { CreateFileButton } from "../create-file-button";

type props = {
  onProcessFinished?: () => void
}

export const ActionBar = (
  {
    onProcessFinished = () => {},
  }: props
) => {
  return (
    <div className={styles.container}>
      <CreateFileButton onProcessFinished={onProcessFinished}/>
    </div>
  );
};