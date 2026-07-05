import { request } from "../request";

type loginReq = {}
type loginRes = {}

export const validate = async (
  {}: loginReq
): Promise<loginRes> => {
  await request(`/api/auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });

  return true;
};