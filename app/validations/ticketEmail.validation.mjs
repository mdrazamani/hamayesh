import Joi from "joi";

export const messageValidationSchema = () => ({
    body: Joi.object({
        name: Joi.string().min(2).max(50).required().messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "string.min": "Name should have a minimum length of 2 characters",
            "string.max": "Name should have a maximum length of 50 characters",
        }),

        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                "string.email": "Please enter a valid email address",
                "string.empty": "Email is required",
            }),

        phone: Joi.string()
            .pattern(/^[0-9]+$/)
            .min(10)
            .max(15)
            .required()
            .messages({
                "string.pattern.base": "Phone number must contain only digits",
                "string.min": "Phone number should have at least 10 digits",
                "string.max": "Phone number should not exceed 15 digits",
                "string.empty": "Phone number is required",
            }),

        subject: Joi.string().min(2).max(100).required().messages({
            "string.empty": "Subject is required",
            "string.min": "Subject should have a minimum length of 2",
            "string.max": "Subject should have a maximum length of 100",
        }),

        message: Joi.string().min(5).max(1000).required().messages({
            "string.empty": "Message is required",
            "string.min": "Message should have a minimum length of 5",
            "string.max": "Message should have a maximum length of 1000",
        }),
    }).options({ abortEarly: false }),
});
