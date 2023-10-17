import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/supporter.service.mjs";

export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedSupporter = await update(id, req.body, next);
        if (updatedSupporter)
            res.respond(
                constants.OK,
                getMessage("success.success"),
                updatedSupporter
            );
    } catch (error) {
        return next(error);
    }
};
