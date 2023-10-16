// services/authService.mjs

import User from "../models/user.model.mjs";
import Role from "../models/role.model.mjs";
import { generateTokens } from "../../utils/generateToken.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";

export const registerUser = async (data, req, res) => {
    const role = await Role.findOne({ name: data.role });
    if (!role) {
        return res.respond(
            constants.BAD_REQUEST,
            getMessage("errors.invalidRole")
        );
    }

    const user = new User({
        ...data,
        role: {
            id: role._id,
            name: role.name,
        },
    });
    await user.save();

    const { token } = await generateTokens(user);

    return user.toResource(token);
};
