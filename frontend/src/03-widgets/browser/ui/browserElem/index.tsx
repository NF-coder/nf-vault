type props = {
  name: string
}

export const BrowserElem = (
  {
    name
  }: props
) => {
  return (
    <div>
      {name}
    </div>
  )
}