import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";

export const getRegistrationSchema = (req) => ({
    body: Joi.object({
        items: Joi.array()
            .items(
                Joi.object({
                    item: Joi.string()
                        .pattern(new RegExp(/^[0-9a-fA-F]{24}$/)) // MongoDB ObjectId pattern
                        .messages({
                            "string.pattern.base": getMessage(
                                "validation.item_invalid"
                            ),
                        }),

                    itemType: Joi.string()
                        .valid("article", "freeRegistration") // specify valid item types
                        .messages({
                            "any.only": getMessage(
                                "validation.itemType_invalid"
                            ),
                        }),

                    number: Joi.number()
                        .integer()
                        .min(1)
                        .messages({
                            "number.base": getMessage(
                                "validation.number_invalid"
                            ),
                            "number.min": getMessage("validation.number_min"),
                        }),
                })
            )
            .min(1)
            .messages({
                "array.base": getMessage("validation.items_invalid"),
                "array.min": getMessage("validation.items_min"),
            }),

        firstName: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                "string.min": getMessage("validation.firstName_min"),
                "string.max": getMessage("validation.firstName_max"),
                "string.empty": getMessage(
                    "validation.first_name_required",
                    req
                ),
            }),
        lastName: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                "string.min": getMessage("validation.lastName_min"),
                "string.max": getMessage("validation.lastName_max"),
                "string.empty": getMessage(
                    "validation.last_name_required",
                    req
                ),
            }),
        phoneNumber: Joi.string()
            .pattern(/^09[0-9]{9}$/)
            .required()
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

        password: Joi.string()
            .min(8)
            .required()
            .pattern(/(?=.*[a-z])/)
            .message(getMessage("validation.password_lowercase"))
            .pattern(/(?=.*[A-Z])/)
            .message(getMessage("validation.password_uppercase"))
            .pattern(/(?=.*\d)/)
            .message(getMessage("validation.password_digit"))
            .pattern(/(?=.*[@$!%*?&#])/)
            .message(getMessage("validation.password_special"))
            .messages({
                "string.min": getMessage("validation.password_min"),
            })
            .required(),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": getMessage("validation.email_valid"),
                "string.empty": getMessage("validation.email_required"), // Note: Add this key in your lang file
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
        national_id: Joi.string()
            .pattern(constants.iranianNationalIdRegex)
            .required()
            .messages({
                "string.pattern.base": getMessage(
                    "validation.national_id_invalid"
                ),
                "string.empty": getMessage("validation.national_id_required"),
            }),

        gender: Joi.string()
            .valid("male", "female", "other")
            .required()
            .messages({
                "any.only": getMessage("validation.gender_valid"),
                "string.empty": getMessage("validation.gender_required"),
            }),

        study_field: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.study_field_required"),
            }),

        degree: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.degree_required"),
            }),

        institute: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.institute_required"),
            }),

        state: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.state_required"),
            }),

        city: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.city_required"),
            }),

        bio: Joi.string()
            .max(500) // you might want to limit the length of a bio
            .optional() // bio is not required
            .allow("") // allows an empty string
            .messages({
                "string.max": getMessage("validation.bio_max"),
                // additional error messages if needed
            }),

        job: Joi.string()
            .min(2) // assuming a job title/name should at least have 2 characters
            .max(100) // assuming a reasonable maximum length for a job title/name
            .required() // job is a required field
            .messages({
                "string.empty": getMessage("validation.job_required"),
                "string.min": getMessage("validation.job_min"),
                "string.max": getMessage("validation.job_max"),
                // additional error messages if needed
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

export const getLoginSchema = (req) => ({
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": getMessage("validation.email_valid"),
            }),
        password: Joi.string()
            .required()
            .messages({
                "string.base": getMessage("validation.password_required"),
            }),
    }).options({ abortEarly: false }),
});

export const getVerifyTokenSchema = (req) => ({
    body: Joi.object({
        api_token: Joi.string().required(),
    }).options({ abortEarly: false }),
});

export const getForgetPasswordValidation = (req) => ({
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": getMessage("validation.email_valid"),
            }),
    }),
});

export const getResetPasswordValidation = (req) => ({
    body: Joi.object({
        token: Joi.string()
            .required()
            .messages({
                "string.base": getMessage("validation.token_required"),
            }),
        password: Joi.string()
            .min(8)
            .required()
            .pattern(/(?=.*[a-z])/)
            .message(getMessage("validation.password_lowercase"))
            .pattern(/(?=.*[A-Z])/)
            .message(getMessage("validation.password_uppercase"))
            .pattern(/(?=.*\d)/)
            .message(getMessage("validation.password_digit"))
            .pattern(/(?=.*[@$!%*?&#])/)
            .message(getMessage("validation.password_special"))
            .messages({
                "string.min": getMessage("validation.password_min"),
            })
            .required(),
        passwordConfirmation: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.only": getMessage(
                    "validation.password_confirmation_match",
                    req
                ),
            }),
    }),
});

export const checkEmailValidation = (req) => ({
    body: Joi.object({
        token: Joi.string()
            .required()
            .min(6)
            .messages({
                "string.base": getMessage("validation.token_required"),
            }),
    }),
});
