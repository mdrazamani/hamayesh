import nodemailer from "nodemailer";
import { gmailUser, gmailPass } from "../../config/index.mjs";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailUser,
        pass: gmailPass,
    },
});

export const sendEmail = async (mailOptions) => {
    mailOptions.from = gmailUser;

    if (await transporter.sendMail(mailOptions)) return true;
    return false;
};
