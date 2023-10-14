import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const updateValidation = (req) => ({
    body: Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.min": getMessage("validation.username_min", req),
                "string.alphanum": getMessage(
                    "validation.username_alphanum",
                    req
                ),
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": getMessage("validation.email_valid", req),
            }),
        role: Joi.string()
            .valid("user", "admin")
            .optional()
            .messages({
                "any.only": getMessage("validation.role_valid", req),
            }),
    }).options({ abortEarly: false }),
});
