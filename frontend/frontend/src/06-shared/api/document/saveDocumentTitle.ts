type saveDocumentTitleReq = {
  title: string
  docId: number
}
type saveDocumentTitleRes = {}

export const saveDocumentTitle = async (
  {
    title,
    docId
  }: saveDocumentTitleReq
): Promise<saveDocumentTitleRes> => {
  const res = await fetch(`/api/document/${docId}/title`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: title
  })
  
  if (!res.ok) {
    return Promise.reject(new Error(`${res.status}`))
  }
  return {}
}