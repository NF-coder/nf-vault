type logoutReq = {}
type logourRes = {}

export const logout = async (
  {}: logoutReq
): Promise<logourRes> => {
  const res = await fetch(`/api/auth/logout`, {
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