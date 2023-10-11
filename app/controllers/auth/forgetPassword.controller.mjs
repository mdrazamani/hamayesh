import pug from "pug";
import User from "../../models/user.model.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import { createPath } from "../../../config/tools.mjs";
import constants from "../../../utils/constants.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";

export const forgetPasswordController = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.respond(
        constants.NOT_FOUND,
        getMessage("errprs.user_not_found", req)
      );
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const mailOptions = {
      to: user.email,
      subject: "Password Reset",
      html: pug.renderFile(
        createPath(
          "../../../views/emails/forget-password.pug",
          import.meta.url
        ),
        {
          token,
        }
      ),
    };

    const result = await sendEmail(mailOptions);
    if (result) {
      return res.respond(
        constants.OK,
        getMessage("success.verification.success", req)
      );
    } else {
      return res.respond(
        constants.BAD_REQUEST,
        getMessage("errors.faild_email", req)
      ); // 500 Internal Server Error
    }
  } catch (error) {
    return res.respond(
      constants.INTERNAL_SERVER_ERROR,
      getMessage("errors.something_went_wrong", req)
    ); // 500 Internal Server Error
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.unauthorized", req)
      );
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.respond(
      constants.OK,
      getMessage("success.passwordReset.success", req)
    );
  } catch (error) {
    return res.respond(
      constants.INTERNAL_SERVER_ERROR,
      getMessage("errors.something_went_wrong", req)
    ); // 500 Internal Server Error
  }
};
