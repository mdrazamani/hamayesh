import jwt from "jsonwebtoken";
import User from "../../models/user.model.mjs";
import Token from "../../models/token.model.mjs";
import { secret } from "../../../config/index.mjs";
import constants from "../../../utils/constants.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";

export const verifyTokenController = async (req, res, next) => {
    try {
        const apiToken = req.body.api_token;

        if (!apiToken) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
            ); // 401 Unauthorized
        }

        jwt.verify(apiToken, secret, async (err, decoded) => {
            if (err || !(await Token.exists({ token: apiToken }))) {
                return res.respond(
                    constants.UNAUTHORIZED,
                    getMessage("errors.unauthorized")
                ); // 401 Unauthorized
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.respond(
                    constants.UNAUTHORIZED,
                    getMessage("errors.unauthorized")
                ); // 401 Unauthorized
            }

            return res.respond(
                constants.OK,
                getMessage("success.success"),
                user.toResource(apiToken)
            );
        });
    } catch (error) {
        next(error);
    }
};
