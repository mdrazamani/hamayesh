// In a new controller file or an existing one where you handle user requests

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/user.service.mjs";

export const updateCurrentUserController = async (req, res, next) => {
    try {
        // Assuming the user's ID is stored in req.user.id when they're logged in
        // This is usually set up by your authentication middleware
        const userId = req.user._id;

        // Get the user data from the request body
        const userData = req.body;

        // Update the user
        const updatedUser = await update(userId, userData);

        // Send response
        res.respond(constants.OK, getMessage("success.success"), updatedUser);
    } catch (error) {
        // Handle errors
        next(error);
    }
};
