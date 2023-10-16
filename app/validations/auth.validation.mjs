import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const getRegistrationSchema = (req) => ({
    body: Joi.object({
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
        role: Joi.string()
            .valid("user", "admin")
            .optional()
            .messages({
                "any.only": getMessage("validation.role_valid"),
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
