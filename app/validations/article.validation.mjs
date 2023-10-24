import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n

export const articleValidationSchema = () => ({
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
            .allow(null, "")
            .optional()
            .messages({
                "string.empty": getMessage("validation.description_empty"),
            }),
        category: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/) // regex to validate the ObjectId
            .required()
            .messages({
                "string.pattern.base": getMessage(
                    "validation.invalid_category"
                ),
                "any.required": getMessage("validation.category_required"),
            }),
        userId: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/) // regex to validate the ObjectId
            .required()
            .messages({
                "string.pattern.base": getMessage("validation.invalid_userId"),
                "any.required": getMessage("validation.userId_required"),
            }),
        articleFiles: Joi.array()
            .items(
                Joi.object({
                    title: Joi.string().optional().allow(null, ""),
                    mimetype: Joi.string().required(),
                    size: Joi.number().integer().required(),
                })
            )
            .optional()
            .allow([]),
        presentationFiles: Joi.array()
            .items(
                Joi.object({
                    title: Joi.string().optional().allow(null, ""),
                    mimetype: Joi.string().required(),
                    size: Joi.number().integer().required(),
                })
            )
            .optional()
            .allow([]),
        // status: Joi.string()
        //     .valid("success", "pending", "failed") // these are the allowed values
        //     .default("pending"),
        arbitration: Joi.object({
            refereeId: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/) // regex to validate the ObjectId
                .allow(null)
                .optional(),
            message: Joi.string().allow(null, "").optional(),
        }).optional(),
    }).options({ abortEarly: false }), // to handle all errors at once
});

// the rest of your code remains unchanged
