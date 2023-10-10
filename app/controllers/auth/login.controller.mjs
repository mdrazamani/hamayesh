import bcrypt from "bcrypt";
import User from "../../models/user.model.mjs";
import constants from "../../../utils/constants.mjs";
import {
    AuthenticationError,
    ForbiddenError,
} from "../../middlewares/error.middleware.mjs";
import { authResource } from "../../resources/auth.resource.mjs";
import { generateTokens } from "../../../utils/generateToken.mjs";
import Token from "../../models/token.model.mjs";

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return AuthenticationError(req, res, next);
        }

        if ((await Token.countDocuments({ userId: user._id })) >= 3) {
            return ForbiddenError(
                req,
                res,
                next,
                "You cannot have more than 3 active tokens"
            );
        }
        const { token } = await generateTokens(user, Token);
        return res
            .status(constants.CREATED)
            .json(authResource({ user, api_token: token, status: "SUCCESS" }));
    } catch (error) {
        next(error);
    }
};
