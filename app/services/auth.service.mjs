// services/authService.mjs

import User from "../models/user.model.mjs";
import Role from "../models/role.model.mjs";
import { getMessage } from "../../config/i18nConfig.mjs";
import constants from "../../utils/constants.mjs";

export const registerUser = async (data, req, res) => {
    const user = new User(data);
    await user.save();
    await user.generateAuthToken();
    return user;
};
