type getDocumentReq = {
  docId: number
}
type getDocumentRes = {
  content: string
}

export const getDocument = async ({
  docId,
}: getDocumentReq): Promise<getDocumentRes> => {
  const res = await fetch(`/api/document/${docId}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }
  return await res.json();
};