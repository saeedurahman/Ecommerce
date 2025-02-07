import Joi from "joi";

export const LoginSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": `Please enter username`,
    "string.min": `Username must be minimum 3 characters!`,
    "string.max": `Username must be maximum 50 characters!`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `Please enter password`,
    "string.min": `Password must be minimum 6 characters!`,
  }),
});
