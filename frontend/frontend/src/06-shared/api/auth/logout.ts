import { request } from "../request";
import { API_V1_PATH } from "../config";

type logoutReq = {}
type logourRes = {}

export const logout = async (
  {}: logoutReq
): Promise<logourRes> => {
  await request(`${API_V1_PATH}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });

  return true;
};