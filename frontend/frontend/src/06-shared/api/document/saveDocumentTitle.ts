import { request } from "../request";

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
  await request(`/api/document/${docId}/title`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: title
  });

  return {}
}