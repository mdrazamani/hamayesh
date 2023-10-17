import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/user.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const updatedUser = await update(req.params.id, req.body, next);
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
