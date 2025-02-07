import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": `Please enter name`,
    "string.min": `Name must be minimum 3 characters!`,
    "string.max": `Name must be maximum 50 characters!`,
  }),
  email: Joi.string()
    .max(50)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": `Please enter email address`,
      "string.email": `Please enter a valid email address`,
      "string.max": `Email must be maximum 50 characters!`,
    }),
  gender: Joi.string().required().messages({
    "string.empty": `Please select gender`,
  }),
  age: Joi.number().required().messages({
    "number.base": `Please enter age`,
  }),

  address: Joi.string().required().messages({
    "string.empty": `Please enter address`,
  }),

  phoneNumber: Joi.string().required().messages({
    "string.empty": `Please enter phone number`,
  }),
});

export default UserSchema;
