import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/user.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id: userIdToDelete } = req.params;
        const authenticatedUserId = req.user.id; // Or however you get the authenticated user's ID

        if (userIdToDelete === authenticatedUserId) {
            return res.respond(
                constants.BAD_REQUEST,
                getMessage("errors.cannot_update_self")
            );
        }

        const updatedUser = await update(userIdToDelete, req.body);
        if (updatedUser)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                updatedUser
            );
    } catch (error) {
        return next(error);
    }
};
