import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n

const judgingStatus = ["accepted", "pending", "failed"];

export const judgingValidationSchema = () => ({
    body: Joi.object({
        article: Joi.string() // because it's an ObjectId, it's validated as a string
            .required()
            .allow(null) // assuming the parent is optional and can be null
            .regex(/^[0-9a-fA-F]{24}$/) // validating ObjectId as a 24-character hexadecimal string
            .messages({
                "string.pattern.base": getMessage("validation.parent_invalid"),
            }),

        referees: Joi.array()
            .items(
                Joi.string()
                    .regex(/^[0-9a-fA-F]{24}$/)
                    .message(getMessage("validation.referee_invalid"))
            )
            .required()
            .messages({
                "array.base": getMessage("validation.rules_array"),
                "array.includes": getMessage("validation.referee_invalid"),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});

export const judgingUpdateValidationSchema = () => ({
    body: Joi.object({
        message: Joi.string()
            .min(0)
            .max(1000)
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
            }),

        scientificMessage: Joi.string()
            .min(0)
            .max(1000)
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
            }),

        rates: Joi.array()
            .items(
                Joi.object({
                    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
                    rate: Joi.number().min(0).max(100),
                })
            )
            .optional()
            .messages({
                "array.base": getMessage("validation.rules_array"),
            }),

        status: Joi.string()
            .valid(...judgingStatus)
            .allow("")
            .optional() // if the description is optional
            .messages({
                "string.empty": getMessage("validation.description_empty"),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});
// the rest of your code remains unchanged
