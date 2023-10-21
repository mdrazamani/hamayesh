import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/article.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await update(id, req.body, req.user);
        if (article)
            res.respond(constants.OK, getMessage("success.success"), article);
    } catch (error) {
        return next(error);
    }
};
