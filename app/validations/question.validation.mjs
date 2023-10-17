import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const questionValidationSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.empty": getMessage("validation.title_required"),
        }),
    description: Joi.string()
        .required()
        .messages({
            "string.empty": getMessage("validation.description_required"),
        }),
    items: Joi.alternatives()
        .try(
            Joi.object({
                question: Joi.string()
                    .required()
                    .messages({
                        "string.empty": getMessage(
                            "validation.question_required"
                        ),
                    }),
                response: Joi.string()
                    .required()
                    .messages({
                        "string.empty": getMessage(
                            "validation.response_required"
                        ),
                    }),
            }),
            Joi.array().items(
                Joi.object({
                    question: Joi.string()
                        .required()
                        .messages({
                            "string.empty": getMessage(
                                "validation.question_required"
                            ),
                        }),
                    response: Joi.string()
                        .required()
                        .messages({
                            "string.empty": getMessage(
                                "validation.response_required"
                            ),
                        }),
                })
            )
        )
        .required()
        .messages({
            "alternatives.match": getMessage("validation.items_required"),
        }),
}).options({ abortEarly: false });
