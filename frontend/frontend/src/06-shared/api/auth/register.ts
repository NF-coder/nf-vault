type registerReq = {
  login: string
  password: string
  invite_code: string
}
type registerRes = {}

export const register = async (
  {
    login,
    password,
    invite_code
  }: registerReq
): Promise<registerRes> => {
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login,
      password: password,
      inviteCode: invite_code
    })
  });

  if (!res.ok) {
    throw new Error(`${await res.text()}`);
  }

  return true;
};