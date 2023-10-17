// user.controller.mjs

import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { deleteDoc } from "../../services/user.service.mjs";

export const deleteController = async (req, res, next) => {
    try {
        const { id: userIdToDelete } = req.params;
        const authenticatedUserId = req.user.id; // Or however you get the authenticated user's ID

        if (userIdToDelete === authenticatedUserId) {
            return res.respond(
                constants.BAD_REQUEST,
                getMessage("errors.cannot_delete_self")
            );
        }

        await deleteDoc(userIdToDelete);
        res.respond(constants.OK, getMessage("success.success")); // message is automatically handled based on status code
    } catch (error) {
        next(error); // this error will be passed to your ConvertError handler
    }
};
