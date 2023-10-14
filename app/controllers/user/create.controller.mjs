import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/user.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const user = await create(req.body, next);
        if (user) res.respond(constants.OK, getMessage("success.success", req));
    } catch (error) {
        next(error);
    }
};
