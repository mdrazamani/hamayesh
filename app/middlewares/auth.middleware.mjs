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
                getMessage("errors.unauthorized")
            ); // 401 Unauthorized
        }

        // Check if the Authorization type is Bearer
        const authHeaderParts = authHeader.split(" ");
        if (authHeaderParts.length !== 2 || authHeaderParts[0] !== "Bearer") {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
            ); // 400 Bad Request
        }

        const apiToken = authHeaderParts[1];

        const decoded = jwt.verify(apiToken, secret);
        const user = await User.findById(decoded.id).populate("role");

        if (!user) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
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
                "/update-current",
            ].includes(req.path)
        ) {
            return res.respond(
                constants.EMAIL_VERIFICATION,
                getMessage("errors.email_not_verified")
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
                getMessage("errors.unauthorized")
            ); // 401 Unauthorized
        }
        next(error);
    }
};

// Middleware for Role-based Authorization with Field-specific Access
export const authorizeRole = (allowedFieldsByRole) => {
    return (req, res, next) => {
        const userRole = req.user.role.name;

        // If the role is not specified in the allowedFieldsByRole, deny access
        if (allowedFieldsByRole[userRole] === undefined) {
            return res.respond(
                constants.FORBIDDEN,
                getMessage("errors.forbidden")
            ); // 403 Forbidden
        }

        // If no fields are provided for the role (empty string), grant full access
        if (allowedFieldsByRole[userRole] === "") {
            next();
            return;
        }

        // Parse the allowed fields for the role
        const allowedFields = allowedFieldsByRole[userRole].split(",");

        // Check if the fields being updated are allowed
        const updateFields = Object.keys(req.body);
        const isUpdateAllowed = updateFields.every((field) =>
            allowedFields.includes(field)
        );

        if (isUpdateAllowed) {
            next();
        } else {
            return res.respond(
                constants.FORBIDDEN,
                getMessage("errors.forbidden")
            ); // 403 Forbidden
        }
    };
};
