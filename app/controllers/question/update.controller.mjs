import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/question.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const question = await update(id, req.body, next);
        if (question)
            res.respond(constants.OK, getMessage("success.success"), question);
    } catch (error) {
        return next(error);
    }
};
