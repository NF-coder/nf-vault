type loginReq = {
  login: string
  password: string
}
type loginRes = {}

export const login = async (
  {
    login,
    password
  }: loginReq
): Promise<loginRes> => {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login,
      password: password
    })
  });

  if (!res.ok) {
    throw new Error(`${await res.text()}`);
  }

  return true;
};