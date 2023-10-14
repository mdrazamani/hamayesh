import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const getRegistrationSchema = (req) => ({
    body: Joi.object({
        password: Joi.string()
            .min(8)
            .required()
            .pattern(/(?=.*[a-z])/)
            .message(getMessage("validation.password_lowercase", req))
            .pattern(/(?=.*[A-Z])/)
            .message(getMessage("validation.password_uppercase", req))
            .pattern(/(?=.*\d)/)
            .message(getMessage("validation.password_digit", req))
            .pattern(/(?=.*[@$!%*?&#])/)
            .message(getMessage("validation.password_special", req))
            .messages({
                "string.min": getMessage("validation.password_min", req),
            })
            .required(),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": getMessage("validation.email_valid", req),
            }),
        role: Joi.string()
            .valid("user", "admin")
            .optional()
            .messages({
                "any.only": getMessage("validation.role_valid", req),
            }),
        // passwordConfirmation: Joi.string()
        //   .valid(Joi.ref("password"))
        //   .required()
        //   .messages({
        //     "any.only": getMessage("auth.registration.password_confirmation_match"),
        //   }),
    }).options({ abortEarly: false }),
});

export const getLoginSchema = (req) => ({
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.email": getMessage("validation.email_valid", req),
            }),
        password: Joi.string()
            .required()
            .messages({
                "string.base": getMessage("validation.password_required", req),
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
                "string.email": getMessage("validation.email_valid", req),
            }),
    }),
});

export const getResetPasswordValidation = (req) => ({
    body: Joi.object({
        token: Joi.string()
            .required()
            .messages({
                "string.base": getMessage("validation.token_required", req),
            }),
        password: Joi.string()
            .min(8)
            .required()
            .pattern(/(?=.*[a-z])/)
            .message(getMessage("validation.password_lowercase", req))
            .pattern(/(?=.*[A-Z])/)
            .message(getMessage("validation.password_uppercase", req))
            .pattern(/(?=.*\d)/)
            .message(getMessage("validation.password_digit", req))
            .pattern(/(?=.*[@$!%*?&#])/)
            .message(getMessage("validation.password_special", req))
            .messages({
                "string.min": getMessage("validation.password_min", req),
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
                "string.base": getMessage("validation.token_required", req),
            }),
    }),
});
