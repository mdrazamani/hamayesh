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
        description: Joi.string().allow("").optional(), // Allow an empty string if description is optional
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
            emails: Joi.array()
                .items(Joi.string().email())
                .messages({
                    "string.email": getMessage("validation.email_format"),
                }),
            phoneNumbers: Joi.array()
                // .items(
                //     Joi.string().pattern(/^[0-9]+$/) // This simple regex checks if the string contains only digits; adapt if needed.
                // )
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.phoneNumber_invalid"
                    ),
                }),
        }),
        // Add validation for social media links
        socials: Joi.object({
            facebook: Joi.string()
                .allow(null, "") // allows the field to be null or an empty string
                .pattern(
                    /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/
                ) // simple pattern for validating Facebook URL (you should use a more comprehensive one)
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_facebook_url"
                    ), // custom invalid URL message
                }),

            twitter: Joi.string()
                .allow(null, "")
                .pattern(
                    /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/
                ) // simple pattern for Twitter URL
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_twitter_url"
                    ),
                }),

            linkedIn: Joi.string()
                .allow(null, "")
                .pattern(
                    /^(https?:\/\/)?(www\.)?linkedin.com\/in\/[a-zA-Z0-9(\.\?)?]/
                ) // simple pattern for LinkedIn URL
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_linkedin_url"
                    ),
                }),

            whatsapp: Joi.string()
                .allow(null, "")
                .pattern(/^(https?:\/\/)?(www\.)?wa.me\/[0-9]{1,15}/) // simple pattern for WhatsApp number
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_whatsapp_url"
                    ),
                }),

            telegram: Joi.string()
                .allow(null, "")
                .pattern(/^(https?:\/\/)?(www\.)?t.me\/[a-zA-Z0-9]{5,}/) // simple pattern for Telegram username
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_telegram_url"
                    ),
                }),

            // add other platforms as needed with respective validation rules
        }).optional(), // make socials optional
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
        description: Joi.string().allow("").optional(), // Allow an empty string if description is optional

        logo: Joi.string().messages({
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
                address: Joi.string().messages({
                    "string.empty": getMessage("validation.address_required"),
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
            emails: Joi.array()
                .items(Joi.string().email())
                .messages({
                    "string.email": getMessage("validation.email_format"),
                }),
            phoneNumbers: Joi.array()
                // .items(
                //     Joi.string().pattern(/^0+$/) // This simple regex checks if the string contains only digits; adapt if needed.
                // )
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.phoneNumber_invalid"
                    ),
                }),
        }),
        // Add validation for social media links
        socials: Joi.object({
            facebook: Joi.string()
                .allow(null, "") // allows the field to be null or an empty string
                .pattern(
                    /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/
                ) // simple pattern for validating Facebook URL (you should use a more comprehensive one)
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_facebook_url"
                    ), // custom invalid URL message
                }),

            twitter: Joi.string()
                .allow(null, "")
                .pattern(
                    /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/
                ) // simple pattern for Twitter URL
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_twitter_url"
                    ),
                }),

            linkedIn: Joi.string()
                .allow(null, "")
                .pattern(
                    /^(https?:\/\/)?(www\.)?linkedin.com\/in\/[a-zA-Z0-9(\.\?)?]/
                ) // simple pattern for LinkedIn URL
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_linkedin_url"
                    ),
                }),

            whatsapp: Joi.string()
                .allow(null, "")
                .pattern(/^(https?:\/\/)?(www\.)?wa.me\/[0-9]{1,15}/) // simple pattern for WhatsApp number
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_whatsapp_url"
                    ),
                }),

            telegram: Joi.string()
                .allow(null, "")
                .pattern(/^(https?:\/\/)?(www\.)?t.me\/[a-zA-Z0-9]{5,}/) // simple pattern for Telegram username
                .messages({
                    "string.pattern.base": getMessage(
                        "validation.invalid_telegram_url"
                    ),
                }),

            // add other platforms as needed with respective validation rules
        }).optional(), // make socials optional
    }).options({ abortEarly: false }),
});
