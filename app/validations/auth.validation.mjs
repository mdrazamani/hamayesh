import Joi from "joi";

export const registrationSchema = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.min": "Username must be at least 3 characters long.",
      "string.alphanum": "Username must only contain alphanumeric characters.",
    }),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(/(?=.*[a-z])/)
      .message("lowercase letter.")
      .pattern(/(?=.*[A-Z])/)
      .message("uppercase letter.")
      .pattern(/(?=.*\d)/)
      .message("digit.")
      .pattern(/(?=.*[@$!%*?&#])/)
      .message("special character.")
      .messages({
        "string.min": "8 characters.",
      }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
    }),
    role: Joi.string().valid("user", "admin").optional().messages({
      "any.only": 'Role must be either "user" or "admin".',
    }),
  }).options({ abortEarly: false }),
};

export const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
    }),
    password: Joi.string().required(),
  }).options({ abortEarly: false }),
};

export const verifyToeknSchema = {
  body: Joi.object({
    api_token: Joi.string().required(),
  }).options({ abortEarly: false }),
};
