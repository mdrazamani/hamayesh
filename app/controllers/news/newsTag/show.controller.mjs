import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/newsTag.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newsTag = await get(id);
        if (newsTag)
            res.respond(constants.OK, getMessage("success.success"), newsTag);
    } catch (error) {
        return next(error);
    }
};
