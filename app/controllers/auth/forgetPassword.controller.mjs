import pug from "pug";
import User from "../../models/user.model.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import { createPath } from "../../../config/tools.mjs";
import constants from "../../../utils/constants.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";
import crypto from "crypto";

export const forgetPasswordController = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.respond(
                constants.NOT_FOUND,
                getMessage("errprs.user_not_found")
            );
        }

        const token = crypto.randomInt(100000, 999999).toString();
        const tokenExpiryTime = 3; // Set token validity period (in minutes)
        const tokenExpiryTimestamp = new Date(
            Date.now() + tokenExpiryTime * 60 * 1000
        );
        req.session.passwordResetToken = token;
        req.session.tokenExpiryTimestamp = tokenExpiryTimestamp;
        req.session.userId = user._id;

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
                getMessage("success.verification.success")
            );
        } else {
            return res.respond(
                constants.BAD_REQUEST,
                getMessage("errors.faild_email")
            ); // 500 Internal Server Error
        }
    } catch (error) {
        next(error);
    }
};

export const resetPasswordController = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        if (
            Date.now() > new Date(req.session.tokenExpiryTimestamp) ||
            !req.session.passwordResetToken
        ) {
            delete req.session.passwordResetToken;
            delete req.session.userId;
            delete req.session.tokenExpiryTimestamp;
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("validation.tokenExpired")
            );
        }

        if (req.session.passwordResetToken !== token) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.invalidToken")
            );
        }

        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
            );
        }

        user.password = password;

        await user.save();

        // Invalidate the session or token
        delete req.session.passwordResetToken;
        delete req.session.userId;

        return res.respond(
            constants.OK,
            getMessage("success.passwordReset.success")
        );
    } catch (error) {
        next(error);
    }
};
