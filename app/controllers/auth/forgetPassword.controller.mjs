import pug from "pug";
import User from "../../models/user.model.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import { createPath } from "../../../config/tools.mjs";
import constants from "../../../utils/constants.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";
import crypto from "crypto";
import Resetoken from "../../models/passwordReset.model.mjs";
import { loadLanguageSetting } from "../../../config/readLang.mjs";

export const forgetPasswordController = async (req, res, next) => {
    const lang = loadLanguageSetting();

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.respond(
                constants.NOT_FOUND,
                getMessage("errprs.user_not_found")
            );
        }

        const token = crypto.randomInt(100000, 999999).toString();
        await Resetoken.create({
            userId: user._id,
            token,
            type: "passwordReset",
        }); // save token in the separate collection

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
                    lang,
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
        const passwordResetToken = await Resetoken.findOne({
            token,
            type: "passwordReset",
        });

        if (
            !passwordResetToken ||
            Date.now() > passwordResetToken.createdAt.getTime() + 3600000
        ) {
            // token is 1 hour valid
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.invalid_or_expired_token")
            );
        }
        const user = await User.findById(passwordResetToken.userId);

        if (!user) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.invalidToken")
            );
        }

        user.password = password; // this should trigger the pre-save hook to hash the password
        await user.save();

        await Resetoken.deleteMany({ userId: user._id }); // clean up used or expired tokens

        return res.respond(
            constants.OK,
            getMessage("success.passwordReset.success")
        );
    } catch (error) {
        next(error);
    }
};
