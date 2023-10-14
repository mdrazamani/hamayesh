import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { deleteDoc } from "../../services/user.service.mjs";

export const deleteController = async (req, res, next) => {
    try {
        const deleteRes = await deleteDoc(req.params.id, next);
        if (deleteRes)
            res.respond(constants.OK, getMessage("success.success", req));
    } catch (error) {
        return next(error);
    }
};
