import { AuthenticationError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user || !(await user.isCorrectPassword(password))) {
    throw new AuthenticationError("Incorrect username or password", {
      codeNum: 401,
    });
  }

  return { username, token: createToken("username", username, "7w") };
};

const createToken = (dataName: string, data: string, expriesTime: string) => {
  return jwt.sign({ [dataName]: data }, process.env.JWT_SECRET as string, {
    expiresIn: expriesTime,
  });
};
