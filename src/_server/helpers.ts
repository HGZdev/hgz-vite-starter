import jwt from "jsonwebtoken";
import {UserRow} from "./graphql/users";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
console.log("JWT_SECRET:", JWT_SECRET);

export const getUserFromToken = (token: string) => {
  if (!token) return;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const makeTokenFromUser = (user: UserRow, expiresIn: string = "1hr") => {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn,
  });

  return token;
};
