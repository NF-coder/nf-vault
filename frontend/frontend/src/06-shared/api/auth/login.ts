import { request } from "../request";

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
  await request(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login,
      password: password
    })
  });

  return true;
};