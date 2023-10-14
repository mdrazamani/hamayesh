// Your controller file

import constants from "../../../utils/constants.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";
import { registerUser } from "../../services/auth.service.mjs";

export const registerController = async (req, res, next) => {
    try {
        const userResource = await registerUser(req.body, req, res);

        // Using the unified response handler to send success response
        return res.respond(
            constants.CREATED,
            getMessage("success.registration.success", req),
            userResource
        );
    } catch (error) {
        next(error);
    }
};
