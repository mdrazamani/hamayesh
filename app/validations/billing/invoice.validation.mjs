import Joi from "joi";
import { getMessage } from "../../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n

export const invoiceValidationSchema = () => ({
    body: Joi.object({
        user: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .messages({
                "string.pattern.base": getMessage("validation.invalid_user"),
                "any.required": getMessage("validation.user_required"),
            }),
        items: Joi.array()
            .items(
                Joi.object({
                    number: Joi.number().required(),
                    item: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // Assuming this is still an ObjectId
                    itemType: Joi.string().required(),
                })
            )
            .required()
            .messages({
                "number.required": getMessage("validation.number_required"),
                "string.pattern.base": getMessage("validation.invalid_item"),
                "itemType.required": getMessage(
                    "validation.item_type_required"
                ),
                "array.base": getMessage("validation.items_required"),
                "array.includes": getMessage(
                    "validation.invalid_item_structure"
                ),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});

export const applyValidationSchema = () => ({
    body: Joi.object({
        codes: Joi.array()
            .items(Joi.string().required())
            .required()
            .messages({
                "string.base": getMessage("validation.invalid_code"),
                "any.required": getMessage("validation.codes_required"),
            }),

        invoiceId: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                "string.pattern.base": getMessage(
                    "validation.invalid_invoiceId"
                ),
                "any.required": getMessage("validation.invoiceId_required"),
            }),

        userId: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .optional()
            .messages({
                "string.pattern.base": getMessage("validation.invalid_userId"),
            }),
    }).options({ abortEarly: false }),
});
