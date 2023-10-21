import Joi from "joi";
import { validateAndTransformSlug } from "../../utils/slugValidation.mjs";

export const newsTagValidationSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100) // Limits the length of a tag's title - adjust as necessary
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title should not be empty",
            "string.max": "Title should have a maximum length of 100",
            "any.required": "Title is a required field",
        }),
    slug: Joi.string()
        .min(1)
        .max(200)
        .custom(validateAndTransformSlug)
        .required()
        .messages({
            "string.empty": "Slug نمی‌تواند خالی باشد",
            "string.min": "Slug باید حداقل شامل 1 کاراکتر باشد",
            "string.max": "Slug نباید بیشتر از 200 کاراکتر داشته باشد",
            "any.required": "وارد کردن Slug الزامی است",
            "any.invalid": "Slug معتبر نیست",
        }),
}).options({ abortEarly: false }); // Gather all validation errors, not just the first one

// This validation schema should be used in your API handlers, typically right after receiving and before processing the client's request.
