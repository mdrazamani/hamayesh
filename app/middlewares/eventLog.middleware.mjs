import EventLog from "../models/eventLog.model.mjs";
import User from "../models/user.model.mjs";
import jwt from "jsonwebtoken";
import { secret } from "../../config/index.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";

const initAction = (method) => {
    switch (method) {
        case "POST":
            return "create";
        case "PUT":
            return "update";
        case "PATCH":
            return "update";
        case "DELETE":
            return "delete";
        default:
            return "get";
    }
};

const initCollectionName = (route) => {
    return route.substring(1);
};

export const logEvent = async (req, res, next) => {
    const originalSend = res.send;
    let logged = false;

    // Override the res.send method to capture the response status
    res.send = function (data) {
        if (!logged) {
            const statusCode = this.statusCode; // Capture the status code
            logEventToDatabase(req, statusCode); // Call the log function
            logged = true;
        }
        return originalSend.apply(this, arguments);
    };

    next();
};

const logEventToDatabase = async (req, statusCode) => {
    try {
        const action = initAction(req.method);
        const collectionName = initCollectionName(req.url);
        const path = req.originalUrl;
        const method = req.method;
        let userId;

        // User identification logic
        if (req.user) {
            userId = req.user._id;
        } else {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const authHeaderParts = authHeader.split(" ");
                if (
                    authHeaderParts.length === 2 &&
                    authHeaderParts[0] === "Bearer"
                ) {
                    const apiToken = authHeaderParts[1];
                    const decoded = jwt.verify(apiToken, secret);
                    const user = await User.findById(decoded.id).populate(
                        "role"
                    );
                    userId = user._id;
                }
            }
        }

        const ipAddress = req.ip;
        const userAgent = req.get("User-Agent");

        const newEvent = new EventLog({
            collectionName,
            userId,
            path,
            method,
            action,
            status: statusCode, // Added status code
            ipAddress,
            userAgent,
            date: new Date(),
            expiresAt: new Date() + 2 * 24 * 60 * 60 * 1000, // 2d
        });

        await newEvent.save();
        console.info("Event logged successfully:", newEvent);
    } catch (error) {
        console.error("Error logging event:", error);
    }
};
