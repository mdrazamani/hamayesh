import Joi from "joi";

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
        .max(200) // You may want to ensure the slug isn't too lengthy for URL purposes
        .pattern(/^[a-zA-Z0-9_-]+$/) // Slugs are usually alphanumeric plus _ and -
        .required()
        .messages({
            "string.pattern.base":
                "Slug can only contain alphanumeric characters, underscores, and dashes",
            "string.empty": "Slug is required",
            "string.min": "Slug should not be empty",
            "string.max": "Slug should have a maximum length of 200",
            "any.required": "Slug is a required field",
        }),
}).options({ abortEarly: false }); // Gather all validation errors, not just the first one

// This validation schema should be used in your API handlers, typically right after receiving and before processing the client's request.
