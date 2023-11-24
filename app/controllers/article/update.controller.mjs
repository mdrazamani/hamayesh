import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/article.service.mjs";
import { get as getUser } from "../../services/user.service.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import { loadLanguageSetting } from "../../../config/readLang.mjs";
import pug from "pug";
import { createPath } from "../../../config/tools.mjs";

export const updateController = async (req, res, next) => {
    const lang = loadLanguageSetting();

    try {
        const user = req.user;
        const { id } = req.params;
        const article = await update(id, req.body, req.user);
        if (article) {
            if (user.role.name === "referee" || user.role.name === "admin") {
                const endUser = await getUser(article.userId);
                const mailOptionsUser = {
                    to: endUser.email,
                    subject: "Article Successfully Updated",
                    html: pug.renderFile(
                        createPath(
                            "../../../views/emails/add-article-user.pug",
                            import.meta.url
                        ),
                        {
                            title: article.title,
                            lang,
                        }
                    ),
                };
                await sendEmail(mailOptionsUser);
            }

            res.respond(constants.OK, getMessage("success.success"), article);
        }
    } catch (error) {
        return next(error);
    }
};
