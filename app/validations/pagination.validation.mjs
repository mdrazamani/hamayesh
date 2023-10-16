import Joi from "joi";
import { getMessage } from "../../config/i18nConfig.mjs";

export const paginationValidation = (req) => ({
    query: Joi.object({
        page: Joi.number()
            .integer()
            .min(1)
            .messages({
                "number.base": getMessage("validation.page_number"),
                "number.integer": getMessage("validation.page_integer"),
                "number.min": getMessage("validation.page_min"),
            }),
        pageSize: Joi.number()
            .integer()
            .min(1)
            .max(100) // you might want to limit the page size to some reasonable maximum
            .messages({
                "number.base": getMessage("validation.pageSize_number"),
                "number.integer": getMessage(
                    "validation.pageSize_integer",
                    req
                ),
                "number.min": getMessage("validation.pageSize_min"),
                "number.max": getMessage("validation.pageSize_max"),
            }),
    }).options({ abortEarly: false }),
});
