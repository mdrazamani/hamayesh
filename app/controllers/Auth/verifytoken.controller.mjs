import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.mjs";
import { Token } from "../../models/token.model.mjs";
import constants from "../../../utils/constants.mjs";
import { AuthenticationError } from "../../middlewares";
import { authResource } from "../../resources";

const SECRET_KEY = "YOUR_SECRET_KEY"; // Use a strong secret key

export const verifyTokenController = async (req, res, next) => {
    try {
        const apiToken = req.body.api_token;

        if (!apiToken) {
            return AuthenticationError(req, res, next);
        }

        jwt.verify(apiToken, SECRET_KEY, async (err, decoded) => {
            if (err || !(await Token.exists({ token: apiToken }))) {
                return AuthenticationError(req, res, next);
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return AuthenticationError(req, res, next);
            }

            return res.status(constants.OK).json(
                authResource({
                    user,
                    api_token: apiToken,
                    status: "SUCCESS",
                })
            );
        });
    } catch (error) {
        next(error);
    }
};
