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
  return (
    <div className={styles.container} onClick={onClick}>
      <span className={styles.fileType}>{type === "directory" ? "[dir]" : "[doc]"}</span>
      {name}
    </div>
  )
}