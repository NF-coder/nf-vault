import { request } from "../request";

type createDocumentReq = {
  name: string
  type: string
}
type createDocumentRes = number

export const createDocument = async (
  {
    name,
    type
  }: createDocumentReq
): Promise<createDocumentRes> => {
  const data = await request<{ id: number }>(`/api/document/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      type: type
    })
  });

  return data.id;
};