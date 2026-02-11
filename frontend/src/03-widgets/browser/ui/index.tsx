import styles from "./index.module.css"

import { BrowserElem } from "./browserElem";

const dirNames = ["test1", "test2", "test3"]

export const Browser = () => {
  return (
    <div className={styles.browserContainer}>
      {dirNames.map((name, idx) => {       
        return (
          <BrowserElem
            key={idx}
            name={name}
          />
        );
      })}
    </div>
  )
}