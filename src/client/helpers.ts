import {serialize} from "cookie";

export const setCookie = (
  name: string,
  value: string,
  expiryHours: number
): string => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expiryHours * 60 * 60 * 1000);

  const cookie = serialize(name, value, {
    expires,
    path: "/",
  });

  document.cookie = cookie;
  return cookie;
};

export const destroyCookie = (name: string): string => {
  const expires = new Date();
  expires.setTime(expires.getTime() - 1);

  const cookie = serialize(name, "", {
    expires,
    path: "/",
  });

  document.cookie = cookie;
  return cookie;
};
