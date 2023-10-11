import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import Token from "../../models/token.model.mjs";

export const logoutController = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.unauthorized", req)
      );
    }

    const result = await Token.findOneAndDelete({ token: token });

    if (!result) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.unauthorized", req)
      );
    }

    return res.respond(constants.OK, getMessage("success.logout.success", req));
  } catch (error) {
    res.respond(
      500,
      error.message || getMessage("errors.something_went_wrong", req)
    );
  }
};
