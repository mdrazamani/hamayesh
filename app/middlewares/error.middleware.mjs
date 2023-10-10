import { ValidationError } from "express-validation";
import APIError from "../../utils/errors.mjs";
import { Debug_mode } from "../../config/index.mjs";
import constants from "../../utils/constants.mjs";

/**
 * Error Handler Sends Stack Trace only during Development Environment
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */

export const ErrorHandler = (err, req, res, next) => {
  // If the error is not an instance of APIError, convert it
  if (!(err instanceof APIError)) {
    err = ConvertError(err, req, res, next);
  }

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
export const NotFound = (req, res, next, message) => {
  const err = new APIError({
    message: message || "Resource Not Found",
    status: constants.NOT_FOUND,
  });
  return Handler(err, req, res, next);
};

export const BadRequestError = (req, res, next, message) => {
  const err = new APIError({
    message: message || "Bad Request",
    status: constants.BAD_REQUEST,
  });
  return Handler(err, req, res, next);
};

export const InternalServerError = (req, res, next, message) => {
  const err = new APIError({
    message: message || "Internal Server Error",
    status: constants.INTERNAL_SERVER_ERROR,
  });
  return Handler(err, req, res, next);
};

export const ForbiddenError = (req, res, next, message) => {
  const err = new APIError({
    message:
      message ||
      "Forbidden: You don't have the necessary permissions to access this resource.",
    status: constants.FORBIDDEN,
  });
  return Handler(err, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const AuthenticationError = (req, res, next, message) => {
  const err = new APIError({
    message:
      message || "Unauthorized: Access is denied due to invalid credentials.",
    status: constants.UNAUTHORIZED,
  });
  return Handler(err, req, res, next);
};

/**
 * Catch 429 ratelimit exceeded
 * @public
 */
export const RateLimitHandler = (req, res, next, message) => {
  const err = new APIError({
    message: message || "Rate limt exceeded, please try again later some time.",
    status: constants.TOO_MANY_REQUESTS,
  });
  return Handler(err, req, res, next);
};
