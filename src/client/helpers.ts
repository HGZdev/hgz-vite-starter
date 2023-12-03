import {serialize, parse} from "cookie";

export const setCookie = (
  name: string,
  value: string,
  expiryHours: number
): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expiryHours * 60 * 60 * 1000);

  const cookie = serialize(name, value, {
    expires,
    path: "/",
  });

  document.cookie = cookie;
};

export const getCookie = (name: string): string | undefined => {
  const cookies = parse(document.cookie);
  return cookies[name];
};
