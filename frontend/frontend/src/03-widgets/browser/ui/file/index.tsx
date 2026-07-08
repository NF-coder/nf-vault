import styles from "./index.module.css"


type props = {
  name: string
  type: string
  onClick?: () => void
}

export const File = (
  {
    name,
    type,
    onClick,
  }: props
) => {
  const fileType = type === "directory" ? "dir" : "doc";

  return (
    <div className={styles.container} onClick={onClick}>
      <span className={styles.fileType}>{fileType}</span>
      <span className={styles.fileName}>{name}</span>
    </div>
  )
}