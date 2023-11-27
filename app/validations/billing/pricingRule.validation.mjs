import Joi from "joi";
import { getMessage } from "../../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n

export const pricingRuleValidationSchema = () => ({
    body: Joi.object({
        name: Joi.string()
            .required()
            .messages({
                "string.base": getMessage("validation.name_string"),
                "string.empty": getMessage("validation.name_required"),
                "any.required": getMessage("validation.name_required"),
            }),
        description: Joi.string()
            .required()
            .messages({
                "string.base": getMessage("validation.description_string"),
                "string.empty": getMessage("validation.description_required"),
                "any.required": getMessage("validation.description_required"),
            }),
        number: Joi.number()
            .integer()
            .messages({
                "number.base": getMessage("validation.number_number"),
                "number.integer": getMessage("validation.number_integer"),
                // Note: 'unique' validation is not supported by Joi and should be handled at the database level
            }),
        price: Joi.number()
            .positive()
            .required()
            .messages({
                "number.base": getMessage("validation.price_number"),
                "number.positive": getMessage("validation.price_positive"),
                "any.required": getMessage("validation.price_required"),
            }),
        additionalInfo: Joi.any(), // As it's a mixed type, Joi.any() is used
    }).options({ abortEarly: false, allowUnknown: true }), // to handle all errors at once and allow additional fields like timestamps
});

export const pricingRuleUpdateValidationSchema = () => ({
    body: Joi.object({
        name: Joi.string().messages({
            "string.base": getMessage("validation.name_string"),
            "string.empty": getMessage("validation.name_required"),
        }),
        description: Joi.string().messages({
            "string.base": getMessage("validation.description_string"),
            "string.empty": getMessage("validation.description_required"),
        }),
        number: Joi.number()
            .integer()
            .messages({
                "number.base": getMessage("validation.number_number"),
                "number.integer": getMessage("validation.number_integer"),
                // Note: 'unique' validation is not supported by Joi and should be handled at the database level
            }),
        price: Joi.number()
            .positive()
            .messages({
                "number.base": getMessage("validation.price_number"),
                "number.positive": getMessage("validation.price_positive"),
            }),
        additionalInfo: Joi.any(), // As it's a mixed type, Joi.any() is used
    }).options({ abortEarly: false, allowUnknown: true }), // to handle all errors at once and allow additional fields like timestamps
});
