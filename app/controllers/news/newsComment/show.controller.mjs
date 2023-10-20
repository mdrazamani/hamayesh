import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { get } from "../../../services/newsComment.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newsComment = await get(id);
        if (newsComment)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                newsComment
            );
    } catch (error) {
        return next(error);
    }
};
