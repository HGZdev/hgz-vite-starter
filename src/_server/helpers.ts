import jwt from "jsonwebtoken";
import {loadEnv} from "vite";
import {UserRow} from "./graphql/users";

export const getViteConfig = (mode: string | undefined): ImportMetaEnv => {
  if (!mode) throw new Error("getViteConfig: mode is undefined");
  return loadEnv(mode, process.cwd()) as never;
};

const {VITE_JWT_SECRET} = getViteConfig(process.env.NODE_ENV);

export const getUserFromToken = (token: string) => {
  if (!token) return;
  if (!VITE_JWT_SECRET)
    throw new Error("getUserFromToken: secret is undefined");

  try {
    const user = jwt.verify(token, VITE_JWT_SECRET);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const makeTokenFromUser = (user: UserRow, expiresIn: string = "1hr") => {
  if (!user) throw new Error("makeTokenFromUser: user is undefined");
  if (!VITE_JWT_SECRET)
    throw new Error("makeTokenFromUser: secret is undefined");

  const token = jwt.sign(user, VITE_JWT_SECRET, {
    expiresIn,
  });

  return token;
};
