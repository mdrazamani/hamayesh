// user.controller.mjs

import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { deleteDoc } from "../../../services/newsComment.service.mjs";

export const deleteController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteDoc(id);
        res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
