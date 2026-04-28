type deleteDocumentReq = {
  docId: number
}
type deleteDocumentRes = {}

export const deleteDocument = async ({
  docId,
}: deleteDocumentReq): Promise<deleteDocumentRes> => {
  const res = await fetch(`/api/document/${docId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return {};
};