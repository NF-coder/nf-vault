type createDocumentReq = {
  name: string
  type: string
}
type createDocumentRes = {
  docId: number
}

export const createDocument = async (
  {
    name,
    type
  }: createDocumentReq
): Promise<createDocumentRes> => {
  const res = await fetch(`/api/document/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      type: type
    })
  });

  if (!res.ok) {
    throw new Error(`${await res.text()}`);
  }

  const data = await res.json();
  return data.id;
};