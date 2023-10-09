import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/user.model.mjs";
import Token from "../../models/token.model.mjs";
import constants from "../../../utils/constants.mjs";
import { AuthenticationError } from "../../middlewares/error.middleware.mjs";
import { authResource } from "../../resources/auth.resource.mjs";

const SECRET_KEY = "YOUR_SECRET_KEY"; // Use a strong secret key

export const loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        SECRET_KEY,
        { expiresIn: "7d" }
      );
      await new Token({
        token,
        refreshToken,
        userId: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }).save();

      const data = {
        user,
        api_token: token,
        status: "SUCCESS",
      };

      return res.status(constants.CREATED).json(authResource(data));
    } else {
      AuthenticationError(req, res, next);
    }
  } catch (error) {
    next(error);
  }
};
