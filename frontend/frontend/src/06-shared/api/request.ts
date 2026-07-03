const getErrorMessage = async (response: Response) => {
  const text = await response.text();

  if (text) return text;
  return `Request failed with status ${response.status}`;
};

export const request = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> => {
  const response = await fetch(
    input,
    init
  );

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await response.json();
  }

  throw new Error("Unknown response object");
};
