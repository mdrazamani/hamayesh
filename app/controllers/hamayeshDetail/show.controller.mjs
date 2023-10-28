import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { get } from "../../services/hamayeshDetail.service.mjs";

export const showController = async (req, res, next) => {
    try {
        const hamayesh = await get();
        if (hamayesh)
            res.respond(constants.OK, getMessage("success.success"), hamayesh);
    } catch (error) {
        return next(error);
    }
};
