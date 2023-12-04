import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
console.log("JWT_SECRET:", JWT_SECRET);

export const getUserFromToken = (token: string) => {
  let user;
  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET);
      return user;
    } catch (err) {
      console.log(err);
    }
  }
  return user;
};

export const makeTokenFromUser = (user: unknown, expiresIn: string = "1hr") => {
  const token = jwt.sign({user}, JWT_SECRET, {
    expiresIn,
  });

  return token;
};
