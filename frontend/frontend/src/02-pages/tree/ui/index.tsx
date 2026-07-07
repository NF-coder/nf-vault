import styles from "./index.module.css"

import { Browser } from "@/03-widgets/browser/ui"
import { Path, type PathItem } from "@/03-widgets/path"
import { Topbar } from "@/03-widgets/topbar"
import { getDocumentPath } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

export const TreePage = () => {
  const { dirId } = useParams();
  const navigate = useNavigate();
  const showError = useNotifyError();
  const currentDirectoryId = dirId === undefined ? null : Number(dirId);
  const isDirectoryIdValid = dirId === undefined || Number.isInteger(currentDirectoryId);
  const [path, setPath] = useState<PathItem[]>([]);

  useEffect(() => {
    if (!isDirectoryIdValid) {
      return;
    }

    let isActive = true;

    const loadPath = async () => {
      if (currentDirectoryId === null) {
        setPath([]);
        return;
      }

      try {
        const directoryPath = await getDocumentPath({ docId: currentDirectoryId });
        if (!isActive) return;

        setPath(directoryPath);
      } catch (error) {
        if (!isActive) return;

        showError(error);
      }
    };

    loadPath();

    return () => {
      isActive = false;
    };
  }, [currentDirectoryId, isDirectoryIdValid]);

  if (!isDirectoryIdValid) {
    return <Navigate to="/tree" replace/>;
  }

  return (
    <div className={styles.pageWrapper}>
      <Topbar/>
      <div className={styles.treeWrapper}>
        <Path
          path={path}
          onNavigate={(id) => navigate(id === null ? "/tree" : `/tree/${id}`)}
        />
        <Browser parentId={currentDirectoryId}/>
      </div>
    </div>
  )
}