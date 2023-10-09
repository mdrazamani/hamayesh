import jwt from "jsonwebtoken";
import Token from "../../models/token.model.mjs";
import User from "../../models/user.model.mjs"; // Import the User model
import constants from "../../../utils/constants.mjs";
import { AuthenticationError } from "../../middlewares/error.middleware.mjs";
import { authResource } from "../../resources/auth.resource.mjs"; // Import the authResource

const SECRET_KEY = "YOUR_SECRET_KEY"; // Use a strong secret key

export const verifyTokenController = async (req, res, next) => {
  try {
    const apiToken = req.body.api_token;

    if (!apiToken) {
      return AuthenticationError(req, res, next);
    }

    jwt.verify(apiToken, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return AuthenticationError(req, res, next);
      }

      const tokenInDb = await Token.findOne({ token: apiToken });
      if (!tokenInDb) {
        return AuthenticationError(req, res, next);
      }

      // Fetch the user associated with the token
      const user = await User.findById(decoded.id);

      if (!user) {
        return AuthenticationError(req, res, next);
      }

      const data = {
        user,
        api_token: apiToken, // Return the verified token
        status: "SUCCESS",
      };

      return res.status(constants.OK).json(authResource(data)); // Use SUCCESS status code for verified tokens
    });
  } catch (error) {
    next(error);
  }
};
