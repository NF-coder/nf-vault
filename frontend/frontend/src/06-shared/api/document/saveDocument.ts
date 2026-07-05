import { request } from "../request";

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
  await request(`/api/document/${docId}/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: content
  });

  return {}
}