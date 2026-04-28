import styles from "./index.module.css"

import { Browser } from "@/03-widgets/browser/ui"
import { Path } from "@/03-widgets/path"
import { Topbar } from "@/03-widgets/topbar"

export const TreePage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Topbar/>
      <div className={styles.treeWrapper}>
        <Path path={["test1", "test2", "test3"]}/>
        <Browser/>
      </div>
    </div>
  )
}