type saveDocumentReq = {
  content: string
  docId: number
}
type saveDocumentRes = {}

export const saveDocument = async (
  {
    content,
    docId
  }: saveDocumentReq
): Promise<saveDocumentRes> => {
  const res = await fetch(`/api/document/${docId}/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: content
  })
  
  if (!res.ok) {
    return Promise.reject(new Error(`${res.status}`))
  }
  return {}
}