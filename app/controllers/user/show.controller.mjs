import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { get } from "../../services/user.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const user = await get(req.params.id, next);
        if (user)
            res.respond(constants.OK, getMessage("success.success"), user);
    } catch (error) {
        return next(error);
    }
};
