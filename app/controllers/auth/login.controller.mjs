import bcrypt from "bcrypt";
import User from "../../models/user.model.mjs";
import { generateTokens } from "../../../utils/generateToken.mjs";
import constants from "../../../utils/constants.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            // Using the unified response handler for error
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
            ); // 401 Unauthorized
        }

        const { token } = await generateTokens(user);

        // Using the unified response handler for success
        res.respond(
            constants.OK,
            getMessage("success.login.success"),
            user.toResource(token)
        );
    } catch (error) {
        next(error);
    }
};
