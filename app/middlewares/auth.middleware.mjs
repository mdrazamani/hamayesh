import jwt from "jsonwebtoken";
import { getMessage } from "../../config/i18nConfig.mjs";
import { secret } from "../../config/index.mjs";
import constants from "../../utils/constants.mjs";
import User from "../models/user.model.mjs";

// Middleware for JWT Authentication
export const authenticateJWT = async (req, res, next) => {
  try {
    const apiToken = req.headers.authorization;

    if (!apiToken) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.unauthorized", req)
      ); // 401 Unauthorized
    }

    const decoded = jwt.verify(apiToken, secret);
    const user = await User.findById(decoded.id).populate("role");

    if (!user) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.unauthorized", req)
      ); // 401 Unauthorized
    }

    req.user = user; // Attach the user object to the request for further processing
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.unauthorized", req)
      ); // 401 Unauthorized
    }
    return res.respond(
      constants.INTERNAL_SERVER_ERROR,
      getMessage("errors.something_went_wrong", req)
    ); // 500 Internal Server Error
  }
};

// Middleware for Role-based Authorization
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && !allowedRoles.includes(req.user.role.name)) {
      return res.respond(
        constants.FORBIDDEN,
        getMessage("errors.forbidden", req)
      ); // 403 Forbidden
    }
    next();
  };
};
