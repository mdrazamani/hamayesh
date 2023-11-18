import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import pug from "pug";
import { createPath } from "../../../config/tools.mjs";
import { get } from "../../services/organizer.service.mjs";

export const sendTicketController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const organizer = await get(id);

        const mailOptions = {
            to: organizer?.details?.emails[0],
            subject: "Hamayesh Ticket",
            html: pug.renderFile(
                createPath(
                    "../../../views/emails/ticket-email.pug",
                    import.meta.url
                ),
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    subject: data.subject,
                    message: data.message,
                }
            ),
        };

        const result = await sendEmail(mailOptions);
        if (result) {
            return res.respond(constants.OK, getMessage("success.success"));
        }
    } catch (error) {
        next(error);
    }
};
