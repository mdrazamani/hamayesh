import { getMessage } from "../../../../config/i18nConfig.mjs";
import constants from "../../../../utils/constants.mjs";
import { update } from "../../../services/newsComment.service.mjs";

export const likeController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newsComment = await update(id, { $inc: { visitNumber: 1 } });
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
