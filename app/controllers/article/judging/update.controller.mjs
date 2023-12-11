import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/judgingArticle.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const judging = await update(id, req.body);
        if (judging)
            res.respond(constants.OK, getMessage("success.success"), judging);
    } catch (error) {
        return next(error);
    }
};
