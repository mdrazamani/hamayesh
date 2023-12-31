import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { create } from "../../services/article.service.mjs";
import { get as getArticleCategory } from "../../services/articleCategory.service.mjs";
import { get as getUser } from "../../services/user.service.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";
import { loadLanguageSetting } from "../../../config/readLang.mjs";
import pug from "pug";
import { createPath } from "../../../config/tools.mjs";

export const createController = async (req, res, next) => {
    const lang = loadLanguageSetting();

    try {
        const user = req.user;
        const article = await create(req.body, user);
        if (article) {
            const mailOptionsUser = {
                to: user.email,
                subject: "Article Successfully Added",
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
            sendEmail(mailOptionsUser);

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

            // const articleCat = await getArticleCategory(article.category);

            // for (const referee of articleCat?.referees) {
            //     const user = await getUser(referee);
            //     mailOptionsReferee.to = user.email;
            //     sendEmail(mailOptionsReferee);
            // }

            res.respond(constants.OK, getMessage("success.success"));
        }
    } catch (error) {
        next(error);
    }
};
