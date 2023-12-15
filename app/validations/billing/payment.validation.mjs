import Joi from "joi";
import { getMessage } from "../../../config/i18nConfig.mjs";

export const paymentValidationSchema = () => ({
    body: Joi.object({
        gateway: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/) // Assuming _id format in MongoDB
            .messages({
                "any.required": getMessage("validation.gateway_required"),
                "string.base": getMessage("validation.gateway_string"),
                "string.pattern.base": getMessage(
                    "validation.gateway_invalid_format"
                ),
            }),

        invoice: Joi.string()
            .required()
            .regex(/^[0-9a-fA-F]{24}$/) // Assuming _id format in MongoDB
            .messages({
                "any.required": getMessage("validation.invoice_required"),
                "string.base": getMessage("validation.invoice_string"),
                "string.pattern.base": getMessage(
                    "validation.invoice_invalid_format"
                ),
            }),

        userId: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/) // Assuming _id format in MongoDB
            .messages({
                "string.base": getMessage("validation.userId_string"),
                "string.pattern.base": getMessage(
                    "validation.userId_invalid_format"
                ),
            }),
    }).options({ abortEarly: false, allowUnknown: true }),
});

export const tokenValidationSchema = () => ({
    body: Joi.object({
        token: Joi.string()
            .required()
            .messages({
                "any.required": getMessage("validation.token_required"),
                "string.base": getMessage("validation.token_string"),
            }),
    }).options({ abortEarly: false, allowUnknown: true }),
});
