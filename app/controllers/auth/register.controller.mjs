import User from "../../models/user.model.mjs";
import constants from "../../../utils/constants.mjs";
import { generateTokens } from "../../../utils/generateToken.mjs";
import Role from "../../models/role.model.mjs";
import Token from "../../models/token.model.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";

export const registerController = async (req, res, next) => {
    try {
        const role = await Role.findOne({ name: req.body.role });
        if (!role) {
            // Using the unified response handler to send error response
            return res.respond(
                constants.BAD_REQUEST,
                getMessage("errors.invalidRole", req)
            );
        }

        const user = new User({
            ...req.body,
            role: {
                id: role._id,
                name: role.name,
            },
        });
        await user.save();

        const { token } = await generateTokens(user, Token);

        // Using the unified response handler to send success response
        return res.respond(
            constants.CREATED,
            getMessage("success.registration.success", req),
            user.toResource(token)
        );
    } catch (error) {
        next(error);
    }
};
