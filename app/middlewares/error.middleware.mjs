import { ValidationError } from "express-validation";
import APIError from "../../utils/errors.mjs";
import { Debug_mode } from "../../config/index.mjs";

/**
 * Error Handler Sends Stack Trace only during Development Environment
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
export const Handler = (err, req, res, next) => {
    const response = {
        code: err.status || 500,
        message: err.message,
        errors: err.errors,
        stack: err.stack,
    };
    if (Debug_mode === "production") delete response.stack;
    res.status(response.code).json(response);
    res.end();
};

export const ErrorHandler = Handler;

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
            message: "Validation Error",
            status: err.statusCode || 400,
            errors,
        });
    } else if (!(err instanceof APIError)) {
        ConvertedError = new APIError({
            message: err.message,
            status: err.statusCode || 500, // Fallback to 500 if statusCode is undefined
            stack: err.stack,
        });
    }
    return Handler(ConvertedError, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const NotFound = (req, res, next) => {
    const err = new APIError({
        message: "Resource Not Found",
        status: 404,
    });
    return Handler(err, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const AuthenticationError = (req, res, next) => {
    const err = new APIError({
        message: "Unauthorized: Access is denied due to invalid credentials.",
        status: 401,
    });
    return Handler(err, req, res, next);
};

/**
 * Catch 429 ratelimit exceeded
 * @public
 */
export const RateLimitHandler = (req, res, next) => {
    const err = new APIError({
        message: "Rate limt exceeded, please try again later some time.",
        status: 429,
    });
    return Handler(err, req, res, next);
};
