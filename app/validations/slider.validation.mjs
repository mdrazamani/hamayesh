import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

// Validation for creating a new slide
export const sliderValidation = () => ({
    body: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
            }),
        description: Joi.string()
            .min(2)
            .max(500)
            .optional() // description might be optional
            .messages({
                "string.min": getMessage("validation.description_min"),
                "string.max": getMessage("validation.description_max"),
                "string.empty": getMessage("validation.description_required"),
            }),
        image: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.image_required"),
            }),
        link: Joi.string()
            .uri() // You might want to ensure this is a valid URI
            .optional()
            .messages({
                "string.uri": getMessage("validation.invalid_link"),
            }),
        isActive: Joi.boolean()
            .optional()
            .messages({
                "boolean.base": getMessage("validation.invalid_isActive"),
            }),
        order: Joi.number()
            .optional()
            .messages({
                "number.base": getMessage("validation.invalid_order"),
            }),
    }).options({ abortEarly: false }), // this option is used to return all errors found, not stop at the first one
});

// Validation for updating an existing slide
export const sliderUpdateValidation = () => ({
    body: Joi.object({
        title: Joi.string()
            .min(2)
            .max(100)
            .optional() // title is now optional
            .messages({
                "string.min": getMessage("validation.title_min"),
                "string.max": getMessage("validation.title_max"),
                "string.empty": getMessage("validation.title_required"),
            }),
        description: Joi.string()
            .min(2)
            .max(500)
            .optional() // description is now optional
            .messages({
                "string.min": getMessage("validation.description_min"),
                "string.max": getMessage("validation.description_max"),
                "string.empty": getMessage("validation.description_required"),
            }),
        image: Joi.string()
            .optional() // image is now optional
            .messages({
                "string.empty": getMessage("validation.image_required"),
            }),
        link: Joi.string()
            .uri() // You might want to ensure this is a valid URI
            .optional()
            .messages({
                "string.uri": getMessage("validation.invalid_link"),
            }),
        isActive: Joi.boolean()
            .optional()
            .messages({
                "boolean.base": getMessage("validation.invalid_isActive"),
            }),
        order: Joi.number()
            .optional()
            .messages({
                "number.base": getMessage("validation.invalid_order"),
            }),
    }).options({ abortEarly: false }), // this option is used to return all errors found, not stop at the first one
});
