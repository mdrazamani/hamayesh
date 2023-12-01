import { getMessage } from "../config/i18nConfig.mjs";
import APIError from "./errors.mjs";

export const justAdmin = (userId, userLogin) => {
    // Check if userLogin is available
    if (!userLogin) {
        throw new APIError({
            message: getMessage("user_not_authenticated"),
            status: 401, // 401 for unauthenticated
        });
    }

    // For admin users, use the provided userId, if available
    if (userLogin.role.name === "admin") {
        return userId || userLogin._id;
    }

    // For non-admin users, always use the logged-in user's ID
    return userLogin._id;
};
