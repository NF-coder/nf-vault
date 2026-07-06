import { request } from "../request";

type getDocumentReq = {
  docId: number
}
type getDocumentRes = {
  title: string
  content: string
}

export const getDocument = async ({
  docId,
}: getDocumentReq): Promise<getDocumentRes> => {
  return request<getDocumentRes>(`/api/document/${docId}`, {
    method: "GET",
  });
};