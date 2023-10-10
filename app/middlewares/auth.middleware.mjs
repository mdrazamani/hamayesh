import jwt from "jsonwebtoken";
import { secret } from "../../config/index.mjs";
import User from "../models/user.model.mjs";
import {
  AuthenticationError,
  ForbiddenError,
  InternalServerError,
} from "./error.middleware.mjs";

// Middleware for JWT Authentication
export const authenticateJWT = async (req, res, next) => {
  try {
    const apiToken = req.headers.authorization;

    if (!apiToken) {
      return AuthenticationError(req, res, next);
    }

    const decoded = jwt.verify(apiToken, secret);
    const user = await User.findById(decoded.id).populate("role");

    if (!user) {
      return AuthenticationError(req, res, next);
    }

    req.user = user; // Attach the user object to the request for further processing
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return AuthenticationError(req, res, next);
    }
    return InternalServerError(req, res, next);
  }
};

// Middleware for Role-based Authorization
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && !allowedRoles.includes(req.user.role.name)) {
      return ForbiddenError(req, res, next);
    }
    next();
  };
};
