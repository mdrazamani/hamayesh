import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const hamayeshDetailValidationSchema = () => ({
    body: Joi.object({
        faTitle: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.faTitle_min"),
                "string.max": getMessage("validation.faTitle_max"),
                "string.empty": getMessage("validation.faTitle_required"),
            }),
        enTitle: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.enTitle_min"),
                "string.max": getMessage("validation.enTitle_max"),
                "string.empty": getMessage("validation.enTitle_required"),
            }),
        description: Joi.string().allow("").optional(),
        iscCode: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.iscCode_required"),
            }),
        aboutHtml: Joi.string().allow("").optional(),
        poster: Joi.string().allow("").optional(),
        eventAddress: Joi.object({
            state: Joi.string().allow(null, "").optional(), // Assuming state is a string; adjust if it's different in your case.
            city: Joi.string().allow(null, "").optional(), // Same as state
            address: Joi.string()
                .required()
                .trim()
                .messages({
                    "string.empty": getMessage("validation.address_required"),
                }),
            longitude: Joi.number()
                .optional()
                .allow(null)
                .messages({
                    "number.base": getMessage("validation.longitude_invalid"),
                }),
            latitude: Joi.number()
                .optional()
                .allow(null)
                .messages({
                    "number.base": getMessage("validation.latitude_invalid"),
                }),
        }).required(),
    }).options({ abortEarly: false }),
});
