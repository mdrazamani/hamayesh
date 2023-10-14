import { getUserByToken } from "../../../utils/getUserByToken.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import User from "../../models/user.model.mjs";

export const emailVerifiedSendController = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        const user = await getUserByToken(authorization);
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

        user.emailVerifiedAt = Date.now();
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.respond(constants.OK, getMessage("success.success", req));
    } catch (error) {
        next(error);
    }
};
