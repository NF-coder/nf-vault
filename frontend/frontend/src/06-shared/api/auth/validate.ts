type loginReq = {}
type loginRes = {}

export const validate = async (
  {}: loginReq
): Promise<loginRes> => {
  const res = await fetch(`/api/auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!res.ok) {
    throw new Error(`${await res.text()}`);
  }

  return true;
};