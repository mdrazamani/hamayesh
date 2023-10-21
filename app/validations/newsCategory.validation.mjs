import Joi from "joi";
import { validateAndTransformSlug } from "../../utils/slugValidation.mjs";

export const newsCategoryValidationSchema = Joi.object({
    title: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title should have a minimum length of 2",
        "string.max": "Title should have a maximum length of 100",
        "any.required": "Title is a required field",
    }),
    description: Joi.string().allow("").optional(), // Since description is not marked as required in your Mongoose schema
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
    image: Joi.string()
        .uri() // Assuming you expect a URI for an image
        .optional(),
    parent: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/) // Validation for a MongoDB ObjectId
        .allow(null) // If you want to allow explicitly setting it to null
        .optional()
        .messages({
            "string.pattern.base": "Parent ID must be a valid ID",
        }),
    level: Joi.number()
        .min(1) // Level seems to be positive numbers, and default is 1
        .optional() // If it's not provided, default in Mongoose schema will handle it
        .messages({
            "number.base": "Level must be a valid number",
            "number.min": "Level must be 1 or greater",
        }),
}).options({ abortEarly: false }); // Will return all errors found, not just the first one

// Usage of this validation schema in your application will depend on your setup. It's commonly used in route validation to check the request body during POST/PUT requests.
