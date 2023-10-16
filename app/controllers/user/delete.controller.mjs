import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { deleteDoc } from "../../services/user.service.mjs";

export const deleteController = async (req, res, next) => {
    try {
        const userIdToDelete = req.params.id;
        const authenticatedUserId = req.user.id; // Or however you get the authenticated user's ID

        // Prevent users from deleting themselves
        if (userIdToDelete === authenticatedUserId) {
            return res.respond(
                constants.BAD_REQUEST,
                getMessage("errors.cannot_delete_self")
            );
        }
        const deleteRes = await deleteDoc(req.params.id, next);
        if (deleteRes)
            return res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        return next(error);
    }
};
