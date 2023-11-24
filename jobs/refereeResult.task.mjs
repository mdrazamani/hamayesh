import HamayeshDetail from "../app/models/hamayeshDetail.model.mjs";
import { CronJob } from "cron";
import { sendEmail } from "../app/emails/verify.email.mjs";
import {
    getAllUniqueUserIds,
    getAllArticlesByUserId,
} from "../app/services/article.service.mjs";
import { get as getUser } from "../app/services/user.service.mjs";
import pug from "pug";
import path from "path";

export async function setupEmailNotificationJobs() {
    const hamayesh = await HamayeshDetail.findOne();

    new CronJob(
        new Date(hamayesh.dates.refeeResult),
        async function () {
            const uniqueUserIds = await getAllUniqueUserIds();

            for (const userId of uniqueUserIds) {
                const articles = await getAllArticlesByUserId(userId);

                const userDetails = await getUser(userId);

                const pugArticles = await createArticlesDesc(
                    userDetails.firstName + " " + userDetails.lastName,
                    articles,
                    hamayesh.minimumPassingScore
                );

                const mailOptionsUser = {
                    to: userDetails.email,
                    subject: "Articles Result",
                    html: pug.renderFile(
                        path.join(
                            __dirname,
                            "../views/emails/articles-result.pug"
                        ),
                        {
                            pug: pugArticles,
                        }
                    ),
                };

                await sendEmail(mailOptionsUser);
            }
        },
        null,
        true,
        "Asia/Tehran"
    );
}

const createArticlesDesc = async (name, articles, mps) => {
    let strMarkDown = `h1 ${name}\n`;
    for (const article of articles) {
        strMarkDown += `h1 ${article.title}\n`;
        let allRate = 0;
        let i = 0;
        for (const arbitration of article.arbitrations) {
            const user = await getUser(arbitration.refereeId);
            strMarkDown += `p ${user.firstName} ${user.lastName}: ${arbitration.rate}\n`;
            allRate += arbitration.rate;
            i++;
        }
        const averageRate = i === 0 ? 0 : allRate / i;
        strMarkDown += `p مجموع امتیاز: ${averageRate.toFixed(1)} از 5\n`;

        if (averageRate.toFixed(1) >= mps)
            strMarkDown += `p مقاله شما مورد تایید قرار گرفت.\n`;
        else strMarkDown += `p مقاله شما رد شده است.\n`;
    }

    return strMarkDown;
};
