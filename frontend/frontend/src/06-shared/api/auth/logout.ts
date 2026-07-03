import { request } from "../request";

type logoutReq = {}
type logourRes = {}

export const logout = async (
  {}: logoutReq
): Promise<logourRes> => {
  await request(`/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });

  return true;
};