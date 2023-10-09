import User from "../../models/user.model.mjs";
import constants from "../../../utils/constants.mjs";
import { authResource } from "../../resources/auth.resource.mjs";
import { generateTokens } from "../../../utils/generateToken.mjs";

const SECRET_KEY = "YOUR_SECRET_KEY"; // Use a strong secret key

export const registerController = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();

        const { token } = await generateTokens(user);

        return res
            .status(constants.CREATED)
            .json(authResource({ user, api_token: token, status: "SUCCESS" }));
    } catch (error) {
        next(error);
    }
};
