import styles from "./index.module.css"


type props = {
  name: string
}

export const File = (
  {
    name
  }: props
) => {
  return (
    <div className={styles.container}>
      {name}
    </div>
  )
}