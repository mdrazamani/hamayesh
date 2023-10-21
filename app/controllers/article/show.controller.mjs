import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { get } from "../../services/article.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await get(id);
        if (article)
            res.respond(constants.OK, getMessage("success.success"), article);
    } catch (error) {
        return next(error);
    }
};
