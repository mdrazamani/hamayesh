import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { get } from "../../services/supporter.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const supporter = await get(id, next);
        if (supporter)
            res.respond(constants.OK, getMessage("success.success"), supporter);
    } catch (error) {
        return next(error);
    }
};
