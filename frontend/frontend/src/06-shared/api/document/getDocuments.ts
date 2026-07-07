import { request } from "../request";
import { API_V1_PATH } from "../config";

export type DocumentListItem = {
  id: number
  type: "document" | "directory" | string
  title: string
}

type getDocumentsRes = DocumentListItem[]

export const getDocuments = async (): Promise<getDocumentsRes> => {
  return request<getDocumentsRes>(`${API_V1_PATH}/document`, {
    method: "GET",
  });
};
