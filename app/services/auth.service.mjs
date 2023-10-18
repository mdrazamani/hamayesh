// services/authService.mjs

import User from "../models/user.model.mjs";

export const registerUser = async (data, req, res) => {
    const user = new User(data);
    await user.save();
    await user.generateAuthToken();
    return user;
};
