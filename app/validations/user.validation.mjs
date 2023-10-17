import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";

export const updateValidation = (req) => ({
    body: Joi.object({
        firstName: Joi.string()
            .min(1)
            .max(50)
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
        email: Joi.string()
            .email()
            .messages({
                "string.email": getMessage("validation.email_valid"),
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

            .messages({
                "string.pattern.base": getMessage(
                    "validation.national_id_invalid"
                ),
                "string.empty": getMessage("validation.national_id_required"),
            }),

        gender: Joi.string()
            .valid("male", "female", "other")

            .messages({
                "any.only": getMessage("validation.gender_valid"),
                "string.empty": getMessage("validation.gender_required"),
            }),

        study_field: Joi.string().messages({
            "string.empty": getMessage("validation.study_field_required"),
        }),

        degree: Joi.string().messages({
            "string.empty": getMessage("validation.degree_required"),
        }),

        institute: Joi.string().messages({
            "string.empty": getMessage("validation.institute_required"),
        }),

        state: Joi.string().messages({
            "string.empty": getMessage("validation.state_required"),
        }),

        city: Joi.string().messages({
            "string.empty": getMessage("validation.city_required"),
        }),
    }).options({ abortEarly: false }),
});
