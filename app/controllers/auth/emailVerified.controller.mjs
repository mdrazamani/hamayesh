import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import crypto from "crypto";
import pug from "pug";
import { createPath } from "../../../config/tools.mjs";
import Resetoken from "../../models/passwordReset.model.mjs";

export const emailVerifiedSendController = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.user_not_found")
            );
        }

        const token = crypto.randomInt(100000, 999999).toString();
        await Resetoken.create({
            userId: user._id,
            token,
            type: "emailVerification",
        }); // Save token in the collection

        const mailOptions = {
            to: user.email,
            subject: "Email Verified",
            html: pug.renderFile(
                createPath(
                    "../../../views/emails/email-verified.pug",
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
                getMessage("success.verification.success"),
                {
                    exTime: Date.now() + 3 * 60 * 1000,
                }
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

export const emailVerifiedCheckController = async (req, res, next) => {
    try {
        const user = req.user;
        const { token } = req.body;

        const emailToken = await Resetoken.findOne({
            token,
            type: "emailVerification",
        });
        if (!emailToken) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.invalidToken")
            );
        }

        // Verify the token has not expired
        if (Date.now() > emailToken.createdAt.getTime() + 3600000) {
            // token is 1 hour valid
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("validation.tokenExpired")
            );
        }

        if (!user) {
            return res.respond(
                constants.UNAUTHORIZED,
                getMessage("errors.unauthorized")
            );
        }

        user.emailVerifiedAt = Date.now();
        await user.save();
        await Resetoken.deleteMany({
            userId: user._id,
            type: "emailVerification",
        });

        return res.respond(constants.OK, getMessage("success.success"), user);
    } catch (error) {
        next(error);
    }
};
