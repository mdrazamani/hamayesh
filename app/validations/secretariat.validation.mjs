import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const secretariatValidation = () => ({
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
            .required()
            .messages({
                "string.min": getMessage("validation.description_min"),
                "string.max": getMessage("validation.description_max"),
                "string.empty": getMessage("validation.description_required"),
            }),
        boss: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.boss_min"),
                "string.max": getMessage("validation.boss_max"),
                "string.empty": getMessage("validation.boss_required"),
            }),
        users: Joi.array()
            .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)) // pattern for validating MongoDB ObjectId
            .optional()
            .messages({
                "string.pattern.base": getMessage("validation.invalid_user_id"),
            }),
        type: Joi.string()
            .valid("academic", "executive", "policy", "conferance") // these should match the types defined in your model
            .required()
            .messages({
                "any.only": getMessage("validation.invalid_secretariat_type"),
                "string.empty": getMessage("validation.type_required"),
            }),
    }).options({ abortEarly: false }), // this option is used to return all errors found, not stop at the first one
});

export const secretariatUpdateValidation = () => ({
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
        boss: Joi.string()
            .min(2)
            .max(100)
            .optional() // boss is now optional
            .messages({
                "string.min": getMessage("validation.boss_min"),
                "string.max": getMessage("validation.boss_max"),
                "string.empty": getMessage("validation.boss_required"),
            }),
        users: Joi.array()
            .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)) // pattern for validating MongoDB ObjectId
            .optional()
            .messages({
                "string.pattern.base": getMessage("validation.invalid_user_id"),
            }),
        type: Joi.string()
            .valid("academic", "executive", "policy", "conference") // these should match the types defined in your model
            .optional() // type is now optional
            .messages({
                "any.only": getMessage("validation.invalid_secretariat_type"),
                "string.empty": getMessage("validation.type_required"),
            }),
    }).options({ abortEarly: false }), // this option is used to return all errors found, not stop at the first one
});
