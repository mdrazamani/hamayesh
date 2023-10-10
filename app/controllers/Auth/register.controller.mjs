import User from "../../models/user.model.mjs";
import constants from "../../../utils/constants.mjs";
import { authResource } from "../../resources/auth.resource.mjs";
import { generateTokens } from "../../../utils/generateToken.mjs";
import Role from "../../models/role.model.mjs";

export const registerController = async (req, res, next) => {
  try {
    const role = await Role.findOne({ name: req.body.role });
    if (!role) {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    const user = new User({
      ...req.body,
      role: {
        id: role._id,
        name: role.name,
      },
    });
    await user.save();

    const { token } = await generateTokens(user);

    return res
      .status(constants.CREATED)
      .json(authResource({ user, api_token: token, status: "SUCCESS" }));
  } catch (error) {
    next(error);
  }
};
