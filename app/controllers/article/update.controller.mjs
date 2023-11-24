import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { update } from "../../services/article.service.mjs";
import { get as getArticleCategory } from "../../services/articleCategory.service.mjs";
import { get as getUser } from "../../services/user.service.mjs";
import { sendEmail } from "../../emails/verify.email.mjs";

export const updateController = async (req, res, next) => {
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
                    }
                ),
            };

            const articleCat = await getArticleCategory(article.category);

            await Promise.all(
                articleCat?.referees?.map(async (referee) => {
                    const user = await getUser(referee);
                    mailOptionsReferee.to = user.email;
                    await sendEmail(mailOptionsReferee);
                })
            );

            res.respond(constants.OK, getMessage("success.success"), article);
        }
    } catch (error) {
        return next(error);
    }
};
