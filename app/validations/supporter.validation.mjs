import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const supporterValidationSchema = () => ({
    body: Joi.object({
        name: Joi.string()
            .min(2)
            .max(100)
            .required()
            .messages({
                "string.min": getMessage("validation.name_min"),
                "string.max": getMessage("validation.name_max"),
                "string.empty": getMessage("validation.name_required"),
            }),
        logo: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.logo_required"),
            }),
        supportType: Joi.string()
            .valid("Financial", "Academic")
            .required()
            .messages({
                "any.only": getMessage("validation.supportType_invalid"),
            }),
        link: Joi.string()
            .uri()
            .allow("")
            .messages({
                "string.uri": getMessage("validation.link_format"),
            }),
    }).options({ abortEarly: false }),
});
