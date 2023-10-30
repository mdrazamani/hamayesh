import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";

export const updateValidation = () => ({
    body: Joi.object({
        firstName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.firstName_min"),
                "string.max": getMessage("validation.firstName_max"),
                "string.empty": getMessage("validation.first_name_required"),
            })
            .optional(),
        lastName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.lastName_min"),
                "string.max": getMessage("validation.lastName_max"),
                "string.empty": getMessage("validation.last_name_required"),
            })
            .optional(),
        phoneNumber: Joi.string()
            .pattern(/^09[0-9]{9}$/)
            .messages({
                "string.pattern.base": getMessage(
                    "validation.phone_number_format_invalid"
                ),
                "string.empty": getMessage("validation.phone_number_required"),
            })
            .optional(),
        email: Joi.string()
            .email()
            .messages({
                "string.email": getMessage("validation.email_valid"),
            })
            .optional(),

        profileImage: Joi.string()
            .optional()
            .allow("")
            .messages({
                "string.base": getMessage("validation.profileImage_string"),
            }),
        national_id: Joi.string()
            .pattern(constants.iranianNationalIdRegex)

            .messages({
                "string.pattern.base": getMessage(
                    "validation.national_id_invalid"
                ),
                "string.empty": getMessage("validation.national_id_required"),
            })
            .optional(),

        gender: Joi.string()
            .valid("male", "female")

            .messages({
                "any.only": getMessage("validation.gender_valid"),
                "string.empty": getMessage("validation.gender_required"),
            })
            .optional(),

        role: Joi.string()
            .min(2) // assuming a role name should at least have 2 characters
            .max(20) // assuming a reasonable maximum length for a role name
            .optional() // role name is a required field
            .messages({
                "string.empty": getMessage("validation.role_name_required"),
                "string.min": getMessage("validation.role_name_min"),
                "string.max": getMessage("validation.role_name_max"),
                // additional error messages if needed
            }),

        password: Joi.string()
            .min(8)
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
            }),

        passwordConfirmation: Joi.any()
            .equal(Joi.ref("password"))
            .when("password", {
                // condition based on the 'password' field
                is: Joi.exist(), // if 'password' is provided
                then: Joi.required(), // then 'passwordConfirmation' must be required
                otherwise: Joi.optional().allow(""), // otherwise, it's optional and can be an empty string
            })
            .messages({
                "any.only": getMessage(
                    "validation.password_confirmation_match"
                ),
                "any.required": getMessage(
                    "validation.password_confirmation_required"
                ),
            }),

        // role: Joi.object({
        //     id: Joi.string()
        //         .required() // The role ID is required
        //         .messages({
        //             "string.empty": getMessage("validation.role_id_required"),
        //             // additional error messages if needed
        //         }),

        //     name: Joi.string()
        //         .min(2) // assuming a role name should at least have 2 characters
        //         .max(100) // assuming a reasonable maximum length for a role name
        //         .required() // role name is a required field
        //         .messages({
        //             "string.empty": getMessage("validation.role_name_required"),
        //             "string.min": getMessage("validation.role_name_min"),
        //             "string.max": getMessage("validation.role_name_max"),
        //             // additional error messages if needed
        //         }),
        // }).optional(), // The role object itself is required

        study_field: Joi.string()
            .messages({
                "string.empty": getMessage("validation.study_field_required"),
            })
            .optional(),

        degree: Joi.string()
            .messages({
                "string.empty": getMessage("validation.degree_required"),
            })
            .optional(),

        institute: Joi.string()
            .messages({
                "string.empty": getMessage("validation.institute_required"),
            })
            .optional(),

        state: Joi.string()
            .messages({
                "string.empty": getMessage("validation.state_required"),
            })
            .optional(),

        city: Joi.string()
            .messages({
                "string.empty": getMessage("validation.city_required"),
            })
            .optional(),

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
            .optional() // job is a required field
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
export const updateCurrent = () => ({
    body: Joi.object({
        firstName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.firstName_min"),
                "string.max": getMessage("validation.firstName_max"),
                "string.empty": getMessage("validation.first_name_required"),
            })
            .optional(),
        lastName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.lastName_min"),
                "string.max": getMessage("validation.lastName_max"),
                "string.empty": getMessage("validation.last_name_required"),
            })
            .optional(),
        phoneNumber: Joi.string()
            .pattern(/^09[0-9]{9}$/)
            .messages({
                "string.pattern.base": getMessage(
                    "validation.phone_number_format_invalid"
                ),
                "string.empty": getMessage("validation.phone_number_required"),
            })
            .optional(),
        email: Joi.string()
            .email()
            .messages({
                "string.email": getMessage("validation.email_valid"),
            })
            .optional(),

        profileImage: Joi.string()
            .optional()
            .allow("")
            .messages({
                "string.base": getMessage("validation.profileImage_string"),
            }),
        national_id: Joi.string()
            .pattern(constants.iranianNationalIdRegex)

            .messages({
                "string.pattern.base": getMessage(
                    "validation.national_id_invalid"
                ),
                "string.empty": getMessage("validation.national_id_required"),
            })
            .optional(),

        gender: Joi.string()
            .valid("male", "female")

            .messages({
                "any.only": getMessage("validation.gender_valid"),
                "string.empty": getMessage("validation.gender_required"),
            })
            .optional(),

        study_field: Joi.string()
            .messages({
                "string.empty": getMessage("validation.study_field_required"),
            })
            .optional(),

        degree: Joi.string()
            .messages({
                "string.empty": getMessage("validation.degree_required"),
            })
            .optional(),

        institute: Joi.string()
            .messages({
                "string.empty": getMessage("validation.institute_required"),
            })
            .optional(),

        state: Joi.string()
            .messages({
                "string.empty": getMessage("validation.state_required"),
            })
            .optional(),

        city: Joi.string()
            .messages({
                "string.empty": getMessage("validation.city_required"),
            })
            .optional(),

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
            .optional() // job is a required field
            .messages({
                "string.empty": getMessage("validation.job_required"),
                "string.min": getMessage("validation.job_min"),
                "string.max": getMessage("validation.job_max"),
                // additional error messages if needed
            }),

        password: Joi.string()
            .min(8)
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
            }),

        passwordConfirmation: Joi.any()
            .equal(Joi.ref("password"))
            .when("password", {
                // condition based on the 'password' field
                is: Joi.exist(), // if 'password' is provided
                then: Joi.required(), // then 'passwordConfirmation' must be required
                otherwise: Joi.optional().allow(""), // otherwise, it's optional and can be an empty string
            })
            .messages({
                "any.only": getMessage(
                    "validation.password_confirmation_match"
                ),
                "any.required": getMessage(
                    "validation.password_confirmation_required"
                ),
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

export const createValidation = () => ({
    body: Joi.object({
        firstName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.firstName_min"),
                "string.max": getMessage("validation.firstName_max"),
                "string.empty": getMessage("validation.first_name_required"),
            })
            .required(),
        lastName: Joi.string()
            .min(1)
            .max(50)
            .messages({
                "string.min": getMessage("validation.lastName_min"),
                "string.max": getMessage("validation.lastName_max"),
                "string.empty": getMessage("validation.last_name_required"),
            })
            .required(),
        phoneNumber: Joi.string()
            .pattern(/^09[0-9]{9}$/)
            .messages({
                "string.pattern.base": getMessage(
                    "validation.phone_number_format_invalid"
                ),
                "string.empty": getMessage("validation.phone_number_required"),
            })
            .required(),
        email: Joi.string()
            .email()
            .messages({
                "string.email": getMessage("validation.email_valid"),
            })
            .required(),

        profileImage: Joi.string()
            .optional()
            .allow("")
            .messages({
                "string.base": getMessage("validation.profileImage_string"),
            }),
        national_id: Joi.string()
            .pattern(constants.iranianNationalIdRegex)

            .messages({
                "string.pattern.base": getMessage(
                    "validation.national_id_invalid"
                ),
                "string.empty": getMessage("validation.national_id_required"),
            })
            .required(),

        gender: Joi.string()
            .valid("male", "female")

            .messages({
                "any.only": getMessage("validation.gender_valid"),
                "string.empty": getMessage("validation.gender_required"),
            })
            .required(),

        role: Joi.string()
            .min(2) // assuming a role name should at least have 2 characters
            .max(20) // assuming a reasonable maximum length for a role name
            .required() // role name is a required field
            .messages({
                "string.empty": getMessage("validation.role_name_required"),
                "string.min": getMessage("validation.role_name_min"),
                "string.max": getMessage("validation.role_name_max"),
                // additional error messages if needed
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
                    "validation.password_confirmation_match"
                ),
            }),

        study_field: Joi.string()
            .messages({
                "string.empty": getMessage("validation.study_field_required"),
            })
            .required(),

        degree: Joi.string()
            .messages({
                "string.empty": getMessage("validation.degree_required"),
            })
            .required(),

        institute: Joi.string()
            .messages({
                "string.empty": getMessage("validation.institute_required"),
            })
            .required(),

        state: Joi.string()
            .messages({
                "string.empty": getMessage("validation.state_required"),
            })
            .required(),

        city: Joi.string()
            .messages({
                "string.empty": getMessage("validation.city_required"),
            })
            .required(),

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
