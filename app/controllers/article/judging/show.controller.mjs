import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/judgingArticle.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const judging = await get(id);
        if (judging)
            res.respond(constants.OK, getMessage("success.success"), judging);
    } catch (error) {
        return next(error);
    }
};
