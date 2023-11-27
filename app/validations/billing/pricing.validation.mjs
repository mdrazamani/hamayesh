import Joi from "joi";
import { getMessage } from "../../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n
import {
    pricingRuleUpdateValidationSchema,
    pricingRuleValidationSchema,
} from "./pricingRule.validation.mjs";

const pricingTypes = ["article"];
export const pricingValidationSchema = () => ({
    body: Joi.object({
        type: Joi.string()
            .valid(...pricingTypes) // Spread the pricingTypes array
            .required()
            .messages({
                "any.only": getMessage("validation.invalid_type"),
                "any.required": getMessage("validation.type_required"),
                "string.base": getMessage("validation.type_string"),
            }),
        rules: Joi.array()
            .items(pricingRuleValidationSchema().body) // استفاده از pricingRuleValidationSchema برای هر عنصر
            .optional()
            .messages({
                "array.base": getMessage("validation.rules_array"),
            }),
    }).options({ abortEarly: false, allowUnknown: true }), // to handle all errors at once and allow additional fields like timestamps
});

export const pricingUpdateValidationSchema = () => ({
    body: Joi.object({
        type: Joi.string()
            .valid(...pricingTypes) // Spread the pricingTypes array
            .messages({
                "any.only": getMessage("validation.invalid_type"),
                "any.required": getMessage("validation.type_required"),
                "string.base": getMessage("validation.type_string"),
            }),
        rules: Joi.array()
            .items(pricingRuleUpdateValidationSchema().body) // استفاده از pricingRuleValidationSchema برای هر عنصر
            .optional()
            .messages({
                "array.base": getMessage("validation.rules_array"),
            }),
    }).options({ abortEarly: false, allowUnknown: true }), // to handle all errors at once and allow additional fields like timestamps
});
