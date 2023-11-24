import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/article.service.mjs";
import { get as getArticleCategory } from "../../services/articleCategory.service.mjs";
import { get as getUser } from "../../services/user.service.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import { loadLanguageSetting } from "../../../config/readLang.mjs";
import pug from "pug";
import { createPath } from "../../../config/tools.mjs";

export const updateController = async (req, res, next) => {
    const lang = loadLanguageSetting();

    try {
        const { id } = req.params;
        const article = await update(id, req.body, req.user);
        if (article) {
            const mailOptionsUser = {
                to: user.email,
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

            const mailOptionsReferee = {
                subject: "Article Is Waiting For You",
                html: pug.renderFile(
                    createPath(
                        "../../../views/emails/add-article-referee.pug",
                        import.meta.url
                    ),
                    {
                        title: article.title,
                        lang,
                    }
                ),
            };

            const articleCat = await getArticleCategory(article.category);

            for (const referee of articleCat?.referees) {
                const user = await getUser(referee);
                mailOptionsReferee.to = user.email;
                await sendEmail(mailOptionsReferee);
            }

            res.respond(constants.OK, getMessage("success.success"), article);
        }
    } catch (error) {
        return next(error);
    }
};
