import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const fileUploadValidation = (req) =>
    ({
        body: Joi.object({
            // ... other body validations if needed
        }),
        files: Joi.object({
            file: Joi.array()
                .items(
                    Joi.object({
                        name: Joi.string().required(),
                        data: Joi.binary().required(),
                        size: Joi.number().max(5000000).required(), // Limiting to approx. 5MB
                        encoding: Joi.string().required(),
                        tempFilePath: Joi.string().allow(null, ""),
                        truncated: Joi.boolean().valid(false).required(),
                        mimetype: Joi.string()
                            .valid("image/jpeg", "image/png", "image/jpg")
                            .required(),
                        md5: Joi.string().required(),
                        mv: Joi.function().required(),
                    }).unknown(true)
                )
                .required(),
            // `unknown(true)` allows the object to have other keys as well, adjust as per your use case
        }).required(),
    }.options({ abortEarly: false }));
