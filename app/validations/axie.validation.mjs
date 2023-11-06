import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n

export const axieValidationSchema = () => ({
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
            .allow("")
            .optional() // if the description is optional
            .messages({
                "string.empty": getMessage("validation.description_empty"),
            }),
        parent: Joi.string() // because it's an ObjectId, it's validated as a string
            .optional()
            .allow(null) // assuming the parent is optional and can be null
            .regex(/^[0-9a-fA-F]{24}$/) // validating ObjectId as a 24-character hexadecimal string
            .messages({
                "string.pattern.base": getMessage("validation.parent_invalid"),
            }),
        level: Joi.number()
            .default(1)
            .optional()
            .min(1)
            .messages({
                "number.base": getMessage("validation.level_invalid"),
                "number.min": getMessage("validation.level_min"),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});

export const axieUpdateValidationSchema = () => ({
    body: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
            }),
        description: Joi.string()
            .allow("")
            .optional() // if the description is optional
            .messages({
                "string.empty": getMessage("validation.description_empty"),
            }),
        parent: Joi.string() // because it's an ObjectId, it's validated as a string
            .optional()
            .allow(null) // assuming the parent is optional and can be null
            .regex(/^[0-9a-fA-F]{24}$/) // validating ObjectId as a 24-character hexadecimal string
            .messages({
                "string.pattern.base": getMessage("validation.parent_invalid"),
            }),
        level: Joi.number()
            .default(1)
            .optional()
            .min(1)
            .messages({
                "number.base": getMessage("validation.level_invalid"),
                "number.min": getMessage("validation.level_min"),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});
// the rest of your code remains unchanged
