import bcrypt from "bcrypt";
import User from "../../models/user.model.mjs";
import constants from "../../../utils/constants.mjs";
import { AuthenticationError } from "../../middlewares/error.middleware.mjs";
import { authResource } from "../../resources/auth.resource.mjs";
import { generateTokens } from "../../../utils/generateToken.mjs";

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return AuthenticationError(req, res, next);
    }

    const { token } = await generateTokens(user);
    return res
      .status(constants.CREATED)
      .json(authResource({ user, api_token: token, status: "SUCCESS" }));
  } catch (error) {
    next(error);
  }
};
