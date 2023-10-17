import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/question.service.mjs";

export const createController = async (req, res, next) => {
    try {
        const question = await create(req.body, next);
        if (question) res.respond(constants.OK, getMessage("success.success"));
    } catch (error) {
        next(error);
    }
};
