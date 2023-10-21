import Joi from "joi";
import { validateAndTransformSlug } from "../../utils/slugValidation.mjs";

export const newsValidationSchema = () => ({
    body: Joi.object({
        title: Joi.string().min(2).max(100).required().messages({
            "string.empty": "Title is required",
            "string.min": "Title should have a minimum length of 2",
            "string.max": "Title should have a maximum length of 100",
        }),
        description: Joi.string().allow("").optional(), // Since description is not marked as required in your Mongoose schema
        // visitNumber: Joi.number()
        //     .min(0) // Assuming you want a positive number, inclusive of 0
        //     .optional(),
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
        // writer: Joi.string()
        //     .pattern(/^[0-9a-fA-F]{24}$/) // Validating as a 24-character hexadecimal (for ObjectId)
        //     .required()
        //     .messages({
        //         "string.pattern.base": "Writer ID must be a valid ID",
        //     }),
        image: Joi.string()
            .uri() // If you're expecting a URL for the image
            .optional(),
        categoryId: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
                "string.pattern.base": "Category ID must be a valid ID",
            }),
        tags: Joi.array()
            .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
            .optional(),
        comments: Joi.array() // Assuming comments are IDs (similar to tags)
            .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
            .optional(),
        publishDate: Joi.date()
            .iso() // If you expect an ISO date string
            .optional(),
        SpecialDate: Joi.date().iso().optional(),
    }).options({ abortEarly: false }), // This will return all the errors found, not just the first one
});
