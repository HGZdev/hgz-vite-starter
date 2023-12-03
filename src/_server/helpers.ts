import jwt from "jsonwebtoken";

export const getUserFromToken = (token: string) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET || "a");
      return user;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const makeTokenFromUser = (user: unknown, expiresIn: string) => {
  const token = jwt.sign({user}, process.env.JWT_SECRET || "a", {
    expiresIn,
  });

  return token;
};
