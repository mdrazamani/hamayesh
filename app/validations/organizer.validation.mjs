import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const organizerValidationSchema = () => ({
    body: Joi.object({
        name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.name_min"),
                "string.max": getMessage("validation.name_max"),
                "string.empty": getMessage("validation.name_required"),
            }),
        logo: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.logo_required"),
            }),
        link: Joi.string()
            .uri()
            .allow("")
            .messages({
                "string.uri": getMessage("validation.link_format"),
            }),
        isMain: Joi.boolean().messages({
            "boolean.base": getMessage("validation.isMain"),
        }),
        details: Joi.object({
            address: Joi.object({
                state: Joi.string().optional().allow(null), // Assuming state is an ID, we validate it as a string; allow null if it can be optional.
                city: Joi.string().optional().allow(null), // Same as state
                address: Joi.string()
                    .required()
                    .messages({
                        "string.empty": getMessage(
                            "validation.address_required"
                        ),
                    }),
                longitude: Joi.number()
                    .optional()
                    .allow(null)
                    .messages({
                        "number.base": getMessage(
                            "validation.longitude_invalid"
                        ),
                    }),
                latitude: Joi.number()
                    .optional()
                    .allow(null)
                    .messages({
                        "number.base": getMessage(
                            "validation.latitude_invalid"
                        ),
                    }),
            }),
            description: Joi.string().allow("").optional(), // Allow an empty string if description is optional
            emails: Joi.array()
                .items(Joi.string().email())
                .messages({
                    "string.email": getMessage("validation.email_format"),
                }),
            phoneNumbers: Joi.array()
                .items(
                    Joi.string().pattern(/^[0-9]+$/) // This simple regex checks if the string contains only digits; adapt if needed.
                )
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.phoneNumber_invalid"
                    ),
                }),
        }),
    }).options({ abortEarly: false }),
});

export const organizerUpdateValidationSchema = () => ({
    body: Joi.object({
        name: Joi.string()
            .min(2)
            .max(100)
            .messages({
                "string.min": getMessage("validation.name_min"),
                "string.max": getMessage("validation.name_max"),
                "string.empty": getMessage("validation.name_required"),
            }),
        logo: Joi.string()
            .messages({
                "string.empty": getMessage("validation.logo_required"),
            }),
        link: Joi.string()
            .uri()
            .allow("")
            .messages({
                "string.uri": getMessage("validation.link_format"),
            }),
        isMain: Joi.boolean().messages({
            "boolean.base": getMessage("validation.isMain"),
        }),
        details: Joi.object({
            address: Joi.object({
                state: Joi.string().optional().allow(null), // Assuming state is an ID, we validate it as a string; allow null if it can be optional.
                city: Joi.string().optional().allow(null), // Same as state
                address: Joi.string()
                    .required()
                    .messages({
                        "string.empty": getMessage(
                            "validation.address_required"
                        ),
                    }),
                longitude: Joi.number()
                    .optional()
                    .allow(null)
                    .messages({
                        "number.base": getMessage(
                            "validation.longitude_invalid"
                        ),
                    }),
                latitude: Joi.number()
                    .optional()
                    .allow(null)
                    .messages({
                        "number.base": getMessage(
                            "validation.latitude_invalid"
                        ),
                    }),
            }),
            description: Joi.string().allow("").optional(), // Allow an empty string if description is optional
            emails: Joi.array()
                .items(Joi.string().email())
                .messages({
                    "string.email": getMessage("validation.email_format"),
                }),
            phoneNumbers: Joi.array()
                .items(
                    Joi.string().pattern(/^[0-9]+$/) // This simple regex checks if the string contains only digits; adapt if needed.
                )
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.phoneNumber_invalid"
                    ),
                }),
        }),
    }).options({ abortEarly: false }),
});
