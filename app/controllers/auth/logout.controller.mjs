import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { exportBearerToken } from "../../../utils/validate.mjs";
import Token from "../../models/token.model.mjs";

export const logoutController = async (req, res, next) => {
    try {
        const token = exportBearerToken(req);

        if (!token) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
            );
        }

        const result = await Token.findOneAndDelete({ token: token });

        if (!result) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
            );
        }

        return res.respond(constants.OK, getMessage("success.logout.success"));
    } catch (error) {
        res.respond(
            500,
            error.message || getMessage("errors.something_went_wrong")
        );
    }
};
