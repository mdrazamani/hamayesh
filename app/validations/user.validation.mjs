import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const updateValidation = (req) => ({
    body: Joi.object({
        firstName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.firstName_min", req),
                "string.max": getMessage("validation.firstName_max", req),
                "string.empty": getMessage(
                    "validation.first_name_required",
                    req
                ),
            }),
        lastName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.lastName_min", req),
                "string.max": getMessage("validation.lastName_max", req),
                "string.empty": getMessage(
                    "validation.last_name_required",
                    req
                ),
            }),
        phoneNumber: Joi.string()
            .pattern(/^09[0-9]{9}$/)
            .messages({
                "string.pattern.base": getMessage(
                    "validation.phone_number_format_invalid",
                    req
                ),
                "string.empty": getMessage(
                    "validation.phone_number_required",
                    req
                ),
            }),
        email: Joi.string()
            .email()
            .messages({
                "string.email": getMessage("validation.email_valid", req),
            }),
        profileImage: Joi.string()
            .optional()
            .allow("")
            .messages({
                "string.base": getMessage(
                    "validation.profileImage_string",
                    req
                ),
            }),
    }).options({ abortEarly: false }),
});
