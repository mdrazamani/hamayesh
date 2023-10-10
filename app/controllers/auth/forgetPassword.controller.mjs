import pug from "pug";
import User from "../../models/user.model.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import { NotFound } from "../../middlewares/error.middleware.mjs";
import { createPath } from "../../../config/tools.mjs";

export const forgetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return NotFound(req, res, next);
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
            return res.status(200).json({ status: "SUCCESS" });
        } else {
            return res.status(400).json({ status: "danger" });
        }
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.body.token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Token is invalid or has expired" });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ status: "Password has been changed" });
    } catch (error) {
        next(error);
    }
};
