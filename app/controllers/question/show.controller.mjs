import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { get } from "../../services/question.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await get(id, next);
        if (question)
            res.respond(constants.OK, getMessage("success.success"), question);
    } catch (error) {
        return next(error);
    }
};
