import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs"; // assuming you have a function to get messages for i18n

export const invoiceValidationSchema = () => ({
    body: Joi.object({
        invoiceNumber: Joi.string()
            .optional() // Assuming invoice number is not mandatory
            .messages({
                "string.empty": getMessage("validation.invoice_number_empty"),
            }),
        user: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                "string.pattern.base": getMessage("validation.invalid_user"),
                "any.required": getMessage("validation.user_required"),
            }),
        items: Joi.array()
            .items(
                Joi.string().pattern(/^[0-9a-fA-F]{24}$/) // Each item must be an ObjectId
            )
            .required()
            .messages({
                "string.pattern.base": getMessage("validation.invalid_item"),
                "any.required": getMessage("validation.items_required"),
            }),
        subtotal: Joi.number()
            .greater(0)
            .required()
            .messages({
                "number.base": getMessage("validation.subtotal_number"),
                "number.greater": getMessage("validation.subtotal_greater"),
                "any.required": getMessage("validation.subtotal_required"),
            }),
        discounts: Joi.array()
            .items(
                Joi.string().pattern(/^[0-9a-fA-F]{24}$/) // Each discount must be an ObjectId
            )
            .optional()
            .messages({
                "string.pattern.base": getMessage(
                    "validation.invalid_discount"
                ),
            }),
        total: Joi.number()
            .greater(Joi.ref("subtotal"))
            .required()
            .messages({
                "number.base": getMessage("validation.total_number"),
                "number.greater": getMessage("validation.total_greater"),
                "any.required": getMessage("validation.total_required"),
            }),
        paymentStatus: Joi.string()
            .valid("pending", "completed", "failed")
            .default("pending")
            .messages({
                "string.base": getMessage("validation.invalid_payment_status"),
                "any.only": getMessage("validation.payment_status_values"),
            }),
    }).options({ abortEarly: false }), // to handle all errors at once
});
