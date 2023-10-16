// unifiedResponseHandler.middleware.mjs

import { ValidationError } from "express-validation";
import APIError from "../../utils/errors.mjs";
import { Debug_mode } from "../../config/index.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";

export const unifiedResponseHandler = (req, res, next) => {
    res.respond = (
        status = 200,
        message = getMessage("success.success"),
        data = null
    ) => {
        if (status >= 400) {
            const err = new APIError({
                message: message,
                status: status || 500,
            });
            return ErrorHandler(err, req, res, next);
        } else {
            res.status(status).json({
                status: "success",
                message: message,
                data: data,
            });
        }
    };

    next();
};

export const ErrorHandler = (err, req, res, next) => {
    const response = {
        code: err.status || 500,
        message: err.message || "Internal Server Error",
        errors: err.errors,
        stack: err.stack,
    };

    if (Debug_mode === "production") delete response.stack;

    res.status(response.code).json(response);
};

/**
 * Convert Error Thrown By Express Validator OR Not an Instance of API Error
 * @public
 */
export const ConvertError = (err, req, res, next) => {
    let ConvertedError = err;

    if (err instanceof ValidationError) {
        const errors = err.details.body.reduce((acc, detail) => {
            if (!acc[detail.path[0]]) {
                acc[detail.path[0]] = [];
            }
            acc[detail.path[0]].push(detail.message);
            return acc;
        }, {});

        ConvertedError = new APIError({
            message: getMessage("errors.validationError"),
            status: err.statusCode || 400,
            errors,
        });
    } else if (err.name === "MongoError") {
        switch (err.code) {
            case 11000: // Duplicate key error
                const key = Object.keys(err.keyValue)[0];
                const value = err.keyValue[key];
                ConvertedError = new APIError({
                    message: `The ${key} "${value}" already exists. Please choose another value.`,
                    status: 409, // Conflict status code
                });
                break;
            case 121: // Document failed validation
                ConvertedError = new APIError({
                    message: getMessage("errors.validationError"),
                    status: 400,
                });
                break;
            // Add more MongoDB error codes and their handlers as needed
            default:
                ConvertedError = new APIError({
                    message: err.message,
                    status: err.statusCode || 500,
                    stack: err.stack,
                });
                break;
        }
    } else if (!(err instanceof APIError)) {
        ConvertedError = new APIError({
            message: err.message,
            status: err.statusCode || 500, // Fallback to 500 if statusCode is undefined
            stack: err.stack,
        });
    }
    return ErrorHandler(ConvertedError, req, res, next);
};

// ... [Keep the rest of your error handlers as they are]
