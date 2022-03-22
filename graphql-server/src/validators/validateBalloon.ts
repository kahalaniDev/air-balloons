import Joi from "joi";
import { UserInputError } from "apollo-server-core";
import { BalloonColor, BalloonType } from "../types/enums";
import { IBalloon } from "../types/interfaces";

const balloonSchemaValidator = Joi.object({
  id: Joi.string().allow("").alphanum().length(24).required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(BalloonType))
    .required(),
  color: Joi.string()
    .valid(...Object.values(BalloonColor))
    .required(),
  position: Joi.object({
    longitude: Joi.number().required().min(-180).max(180),
    latitude: Joi.number().required().min(-90).max(90),
    altitude: Joi.number().required().min(0),
  }).required(),
});

export const validateBalloon = (balloon: IBalloon) => {
  const { error } = balloonSchemaValidator.validate(balloon);
  if (error) {
    const message = error.details.map((err) => err.message).join(",");
    throw new UserInputError(message, { codeNum: 400 });
  }
};
