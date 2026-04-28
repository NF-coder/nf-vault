import styles from "./index.module.css"
import { File } from "./file"
import { ActionBar } from "./action-bar"

const dirNames = ["test1", "test2", "test3"]

export const Browser = () => {

  return (
    <div className={styles.browserContainer}>
      <ActionBar/>
      {dirNames.map((name, idx) => {       
        return (
          <File
            key={idx}
            name={name}
          />
        );
      })}
    </div>
  )
}