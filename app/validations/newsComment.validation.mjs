import Joi from "joi";

export const newsCommentValidationSchema = Joi.object({
    comment: Joi.string().min(1).required().messages({
        "string.empty": "Comment is required",
        "string.min": "Comment should not be empty",
        "any.required": "Comment is a required field",
    }),
    // likeNumber: Joi.number()
    //     .min(0) // Assuming the number of likes cannot be negative
    //     .optional()
    //     .messages({
    //         "number.base": "Like number must be a valid number",
    //         "number.min": "Like number must be 0 or greater",
    //     }),
    userFirstName: Joi.string()
        .max(100) // You can decide the appropriate max length
        .optional() // Assuming this is not required based on your schema
        .allow(""), // If you want to allow an empty string
    userLastName: Joi.string()
        .max(100) // Decide the appropriate max length
        .optional() // Same as above
        .allow(""), // If you want to allow an empty string
    userEmail: Joi.string()
        .email({ tlds: { allow: false } }) // Validates the email without checking top-level domain
        .optional() // If it's not mandatory
        .messages({
            "string.email": "Email must be a valid email address",
        }),
    userIp: Joi.string()
        .ip({
            version: ["ipv4", "ipv6"],
            cidr: "optional",
        })
        .optional() // If IP tracking is not mandatory
        .messages({
            "string.ip": "IP address must be a valid IPv4 or IPv6 address",
        }),
}).options({ abortEarly: false }); // To return all validation errors, not just the first

// Usage of this validation schema would typically occur in your request handling code, ensuring that incoming data for new comments matches these rules.
