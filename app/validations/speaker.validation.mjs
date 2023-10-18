import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const speakerValidation = () => ({
    body: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
            }),
        description: Joi.string()
            .min(2)
            .max(500)
            .required()
            .messages({
                "string.min": getMessage("validation.description_min"),
                "string.max": getMessage("validation.description_max"),
                "string.empty": getMessage("validation.description_required"),
            }),
        user: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/) // pattern for validating MongoDB ObjectId
            .required()
            .messages({
                "string.pattern.base": getMessage("validation.invalid_user_id"),
                "string.empty": getMessage("validation.user_required"),
            }),
        // Validate other fields like 'expertiseArea', 'speakerPhoto', etc., if needed
    }).options({ abortEarly: false }), // this option is used to return all errors found, not stop at the first one
});

export const speakerUpdateValidation = () => ({
    body: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .optional() // title is now optional
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
            }),
        description: Joi.string()
            .min(2)
            .max(500)
            .optional() // description is now optional
            .messages({
                "string.min": getMessage("validation.description_min"),
                "string.max": getMessage("validation.description_max"),
                "string.empty": getMessage("validation.description_required"),
            }),
        user: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/) // pattern for validating MongoDB ObjectId
            .optional() // user is now optional
            .messages({
                "string.pattern.base": getMessage("validation.invalid_user_id"),
            }),
        // Validate other fields like 'expertiseArea', 'speakerPhoto', etc., if they are present in your Speaker model and need validation during updates
    }).options({ abortEarly: false }), // this option is used to return all errors found, not stop at the first one
});
