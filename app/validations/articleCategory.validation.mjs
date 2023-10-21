import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n

export const articleCategoryValidationSchema = () => ({
    body: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
                "any.required": getMessage("validation.title_required"),
            }),
        description: Joi.string()
            .allow(null, "") // allows an optional, empty or null description
            .optional()
            .messages({
                "string.empty": getMessage("validation.description_empty"),
            }),
        referees: Joi.array()
            .items(
                Joi.string()
                    .pattern(/^[0-9a-fA-F]{24}$/) // regex to validate the ObjectId
                    .message(getMessage("validation.invalid_referee"))
            )
            .optional()
            .allow([]) // allows an empty array
            .messages({
                "array.base": getMessage("validation.referees_invalid"),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});

// the rest of your code remains unchanged
