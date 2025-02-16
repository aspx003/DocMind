import { jwtDecode } from "jwt-decode";

export const checkTokenValidity = (token) => {
  const time = jwtDecode(token).exp;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  return time > currentTimestamp;
};
