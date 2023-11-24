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
        articleFiles: Joi.array().optional(),
        presentationFiles: Joi.array().optional(),
        // status: Joi.string()
        //     .valid("success", "pending", "failed") // these are the allowed values
        //     .default("pending"),
        arbitrations: Joi.array()
            .items(
                Joi.object({
                    refereeId: Joi.string()
                        .pattern(/^[0-9a-fA-F]{24}$/) // regex to validate the ObjectId
                        .required()
                        .messages({
                            "string.pattern.base": getMessage(
                                "validation.invalid_refereeId"
                            ),
                            "any.required": getMessage(
                                "validation.refereeId_required"
                            ),
                        }),
                    files: Joi.array().optional(), // You can add more specific validation for files if needed
                    messages: Joi.string().optional(),
                    rate: Joi.number().min(1).max(5).optional(),
                    // ... other fields in arbitration if necessary ...
                })
            )
            .optional()
            .messages({
                "array.includesRequiredUnknowns": getMessage(
                    "validation.arbitrations_required"
                ),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});

export const articleUpdateValidationSchema = () => ({
    body: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
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
            .messages({
                "string.pattern.base": getMessage(
                    "validation.invalid_category"
                ),
                "any.required": getMessage("validation.category_required"),
            }),
        userId: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/) // regex to validate the ObjectId
            .messages({
                "string.pattern.base": getMessage("validation.invalid_userId"),
                "any.required": getMessage("validation.userId_required"),
            }),
        articleFiles: Joi.array().optional(),
        presentationFiles: Joi.array().optional(),
        // status: Joi.string()
        //     .valid("success", "pending", "failed") // these are the allowed values
        //     .default("pending"),
        arbitrations: Joi.array()
            .items(
                Joi.object({
                    refereeId: Joi.string()
                        .pattern(/^[0-9a-fA-F]{24}$/) // regex to validate the ObjectId
                        .required()
                        .messages({
                            "string.pattern.base": getMessage(
                                "validation.invalid_refereeId"
                            ),
                            "any.required": getMessage(
                                "validation.refereeId_required"
                            ),
                        }),
                    files: Joi.array().optional(), // You can add more specific validation for files if needed
                    messages: Joi.string().optional(),
                    rate: Joi.number().min(1).max(5).optional(),
                    // ... other fields in arbitration if necessary ...
                })
            )
            .optional()
            .messages({
                "array.includesRequiredUnknowns": getMessage(
                    "validation.arbitrations_required"
                ),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});

// the rest of your code remains unchanged

// the rest of your code remains unchanged
