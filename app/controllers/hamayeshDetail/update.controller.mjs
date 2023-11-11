import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/hamayeshDetail.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const hamayeshDetail = await update(req.body);
        if (hamayeshDetail)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                hamayeshDetail
            );
    } catch (error) {
        return next(error);
    }
};
