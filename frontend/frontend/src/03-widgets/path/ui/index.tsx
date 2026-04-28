import styles from "./index.module.css"

import { PathElem } from "./pathElem";


type props = {
  path: string[]
}

export const Path = (
  {
    path
  }: props
) => {
  return (
    <div className={styles.pathWrapper}>
      {path.map((name, idx) => {       
          return (
            <>
              <PathElem
                key={idx}
                name={name}
              />
              <p>/</p>
            </>
          );
        })}
    </div>
  )
}