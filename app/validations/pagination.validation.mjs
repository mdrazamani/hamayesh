import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const paginationValidation = (req) => ({
    query: Joi.object({
        page: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                "number.base": getMessage("validation.page_number", req),
                "number.integer": getMessage("validation.page_integer", req),
                "number.min": getMessage("validation.page_min", req),
            }),
        pageSize: Joi.number()
            .integer()
            .min(1)
            .max(100) // you might want to limit the page size to some reasonable maximum
            .required()
            .messages({
                "number.base": getMessage("validation.pageSize_number", req),
                "number.integer": getMessage(
                    "validation.pageSize_integer",
                    req
                ),
                "number.min": getMessage("validation.pageSize_min", req),
                "number.max": getMessage("validation.pageSize_max", req),
            }),
    }).options({ abortEarly: false }),
});
