import { AuthenticationError } from "../../middlewares/error.middleware.mjs";
import Token from "../../models/token.model.mjs";

export const logoutController = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.error(
        AuthenticationError(req, res, next, "No token provided"),
        401
      ); // Unauthorized
    }

    const result = await Token.findOneAndDelete({ token: token });

    if (!result) {
      return res.error(
        AuthenticationError(req, res, next, "Invalid token"),
        401
      ); // Unauthorized
    }

    return res.success(null, "Successfully logged out");
  } catch (error) {
    next(error);
  }
};
