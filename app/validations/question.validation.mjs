import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const questionValidationSchema = () => ({
    body: Joi.object({
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
        // 'items' are now optional at this level because they can be managed separately.
        // This change assumes you could create a question without items and add them later.
        items: Joi.array()
            .items(
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
            .optional(), // 'items' is optional during the creation of a question
    }).options({ abortEarly: false }),
});

// For adding a new item to the 'items' array of a question
export const addItemValidationSchema = () => ({
    body: Joi.object({
        question: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.question_required"),
            }),
        response: Joi.string()
            .required()
            .messages({
                "string.empty": getMessage("validation.response_required"),
            }),
    }).options({ abortEarly: false }),
});
// For updating an item in the 'items' array
export const updateItemValidationSchema = () => ({
    body: Joi.object({
        question: Joi.string()
            .optional() // Making it optional allows for partial updates
            .messages({
                "string.empty": getMessage("validation.question_required"),
            }),
        response: Joi.string()
            .optional() // Same reasoning as above
            .messages({
                "string.empty": getMessage("validation.response_required"),
            }),
    }).options({ abortEarly: false }),
});
