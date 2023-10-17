import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { getAll } from "../../services/question.service.mjs";

export const indexController = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10, ...query } = req.query;

        const questions = await getAll({
            page: Number(page),
            pageSize: Number(pageSize),
            ...query,
        });
        if (questions)
            res.respond(constants.OK, getMessage("success.success"), questions);
    } catch (error) {
        return next(error);
    }
};
