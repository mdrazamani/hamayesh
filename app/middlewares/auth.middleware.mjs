import jwt from "jsonwebtoken";
import { getMessage } from "../../config/i18nConfig.mjs";
import { secret } from "../../config/index.mjs";
import constants from "../../utils/constants.mjs";
import User from "../models/user.model.mjs";

// Middleware for JWT Authentication
export const authenticateJWT = async (req, res, next) => {
    try {
        // Extract the token from the 'Authorization' header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized", req)
            ); // 401 Unauthorized
        }

        // Check if the Authorization type is Bearer
        const authHeaderParts = authHeader.split(" ");
        if (authHeaderParts.length !== 2 || authHeaderParts[0] !== "Bearer") {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized", req)
            ); // 400 Bad Request
        }

        const apiToken = authHeaderParts[1];

        const decoded = jwt.verify(apiToken, secret);
        const user = await User.findById(decoded.id).populate("role");

        if (!user) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized", req)
            ); // 401 Unauthorized
        }

        // Check email verification status for non-exception routes
        if (
            !user.emailVerifiedAt &&
            ![
                "/email-verified-send",
                "/email-verified-check",
                "/verify-token",
                "/logout",
            ].includes(req.path)
        ) {
            return res.respond(
                constants.EMAIL_VERIFICATION,
                getMessage("errors.email_not_verified", req)
            ); // 403 Forbidden
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
        next(error);
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
