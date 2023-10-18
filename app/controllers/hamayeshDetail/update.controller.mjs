import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/hamayeshDetail.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const hamayeshDetail = await update(id, req.body, next);
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
