import nodemailer from "nodemailer";
import { gmailUser, gmailPass } from "../../config/index.mjs";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailUser,
        pass: gmailPass,
    },
});

export const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: gmailUser,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions);
};
