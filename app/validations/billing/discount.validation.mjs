import Joi from "joi";
import { getMessage } from "../../../config/i18nConfig.mjs";

const pricingTypes = ["article", "freeRegistration"];

export const discountValidationSchema = () => ({
    body: Joi.object({
        amount: Joi.number()
            .optional()
            .messages({
                "number.base": getMessage("validation.amount_number"),
            }),
        percent: Joi.number()
            .min(0)
            .max(100)
            .optional()
            .messages({
                "number.base": getMessage("validation.percent_number"),
                "number.min": getMessage("validation.percent_min"),
                "number.max": getMessage("validation.percent_max"),
            }),
        type: Joi.string()
            .valid(...pricingTypes)
            .messages({
                "any.only": getMessage("validation.invalid_type"),
                "any.required": getMessage("validation.type_required"),
                "string.base": getMessage("validation.type_string"),
            }),
        rules: Joi.array()
            .items(
                Joi.string()
                    .pattern(/^[0-9a-fA-F]{24}$/)
                    .messages({
                        "string.pattern.base": getMessage(
                            "validation.invalid_rule_id"
                        ),
                    })
            )
            .optional()
            .messages({
                "array.base": getMessage("validation.rules_array"),
            }),
        users: Joi.array()
            .items(
                Joi.string()
                    .pattern(/^[0-9a-fA-F]{24}$/)
                    .messages({
                        "string.pattern.base": getMessage(
                            "validation.invalid_user_id"
                        ),
                        "string.empty": getMessage("validation.user_required"),
                    })
            )
            .optional()
            .messages({
                "array.base": getMessage("validation.rules_array"),
            }),
        expiresAt: Joi.date()
            .required()
            .messages({
                "date.base": getMessage("validation.invalid_expiration_date"),
                "any.required": getMessage(
                    "validation.expiration_date_required"
                ),
            }),
    }).options({ abortEarly: false }),
});

export const discountUpdateValidationSchema = () => ({
    body: Joi.object({
        amount: Joi.number()
            .optional()
            .messages({
                "number.base": getMessage("validation.amount_number"),
            }),
        percent: Joi.number()
            .min(0)
            .max(100)
            .optional()
            .messages({
                "number.base": getMessage("validation.percent_number"),
                "number.min": getMessage("validation.percent_min"),
                "number.max": getMessage("validation.percent_max"),
            }),
        type: Joi.string()
            .valid(...pricingTypes)
            .messages({
                "any.only": getMessage("validation.invalid_type"),
                "string.base": getMessage("validation.type_string"),
            }),
        rules: Joi.array()
            .items(
                Joi.string()
                    .pattern(/^[0-9a-fA-F]{24}$/)
                    .messages({
                        "string.pattern.base": getMessage(
                            "validation.invalid_rule_id"
                        ),
                    })
            )
            .optional()
            .messages({
                "array.base": getMessage("validation.rules_array"),
            }),

        users: Joi.array()
            .items(
                Joi.string()
                    .pattern(/^[0-9a-fA-F]{24}$/)
                    .messages({
                        "string.pattern.base": getMessage(
                            "validation.invalid_user_id"
                        ),
                        "string.empty": getMessage("validation.user_required"),
                    })
            )
            .optional()
            .messages({
                "array.base": getMessage("validation.rules_array"),
            }),
        expiresAt: Joi.date().messages({
            "date.base": getMessage("validation.invalid_expiration_date"),
            "any.required": getMessage("validation.expiration_date_required"),
        }),
    }).options({ abortEarly: false }),
});
