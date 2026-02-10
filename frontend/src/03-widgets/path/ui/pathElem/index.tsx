import styles from "./index.module.css"

type props = {
  name: string
}

export const PathElem = (
  {
    name
  }: props
) => {
  return (
    <p className={styles.pathElem}>
      {name}
    </p>
  )
}