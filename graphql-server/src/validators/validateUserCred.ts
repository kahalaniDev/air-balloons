import Joi from "joi";
import { UserInputError } from "apollo-server-core";

const userCredentialsSchemaValidator = Joi.object({
  username: Joi.string().min(1).max(20).required(),
  password: Joi.string()
    .min(8)
    .max(12)
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required(),
});

export const validateUserCred = (userCred: {
  username: string;
  password: string;
}) => {
  const { error } = userCredentialsSchemaValidator.validate(userCred);
  if (error) {
    const message = error.details.map((err) => err.message).join(",");
    console.log(message);
    throw new UserInputError(message, { codeNum: 400 });
  }
};
