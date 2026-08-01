import styles from "./index.module.css"

import { Browser } from "@/03-widgets/browser/ui"
import { Path, type PathItem } from "@/03-widgets/path"
import { Topbar } from "@/03-widgets/topbar"
import { useNavigate } from "react-router";

type Props = {
  currentDirectoryId: number | null;
  path: PathItem[];
};

export const TreePage = ({ currentDirectoryId, path }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <Topbar/>
      <div className={styles.treeWrapper}>
        <Path
          path={path}
          onNavigate={(id) => navigate(id === null ? "/" : `/${id}`)}
        />
        <Browser parentId={currentDirectoryId}/>
      </div>
    </div>
  )
}