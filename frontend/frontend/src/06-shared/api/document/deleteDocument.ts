import { request } from "../request";

type deleteDocumentReq = {
  docId: number
}
type deleteDocumentRes = {}

export const deleteDocument = async ({
  docId,
}: deleteDocumentReq): Promise<deleteDocumentRes> => {
  await request(`/api/document/${docId}`, {
    method: "DELETE",
  });
  return {};
};