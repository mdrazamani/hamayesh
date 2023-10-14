import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import crypto from "crypto";
import pug from "pug";
import { createPath } from "../../../config/tools.mjs";

export const emailVerifiedSendController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.user_not_found", req)
      );
    }

    const token = crypto.randomInt(100000, 999999).toString();
    const tokenExpiryTime = 3; // Set token validity period (in minutes)
    const tokenExpiryTimestamp = new Date(
      Date.now() + tokenExpiryTime * 60 * 1000
    );
    req.session.verifiedEmailToken = token;
    req.session.tokenExpiryTimestamp = tokenExpiryTimestamp;
    req.session.userId = user._id;

    const mailOptions = {
      to: user.email,
      subject: "Email Verified",
      html: pug.renderFile(
        createPath("../../../views/emails/email-verified.pug", import.meta.url),
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
    next(error);
  }
};

export const emailVerifiedCheckController = async (req, res, next) => {
  try {
    const user = req.user;
    const { token } = req.body;

    if (
      Date.now() > new Date(req.session.tokenExpiryTimestamp) ||
      !req.session.verifiedEmailToken
    ) {
      delete req.session.verifiedEmailToken;
      delete req.session.userId;
      delete req.session.tokenExpiryTimestamp;
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("validation.tokenExpired", req)
      );
    }

    if (req.session.verifiedEmailToken !== token) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.invalidToken", req)
      );
    }

    if (!user) {
      return res.respond(
        constants.UNAUTHORIZED,
        getMessage("errors.unauthorized", req)
      );
    }

    user.emailVerifiedAt = Date.now();
    delete req.session.verifiedEmailToken;
    delete req.session.userId;

    await user.save();

    return res.respond(constants.OK, getMessage("success.success", req));
  } catch (error) {
    next(error);
  }
};
