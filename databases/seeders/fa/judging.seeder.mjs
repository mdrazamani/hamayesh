import JudgingArticle from "../../../app/models/JudgingArticles.model.mjs"; // Adjust the import path as necessary
import Article from "../../../app/models/article.model.mjs";
import User from "../../../app/models/user.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

const judgingStatus = ["accepted", "pending", "failed"];
const rates = [
    {
        faTitle: "تناسب مقاله با موضوعات کنفرانس",
        enTitle: "Suitability of the article to the conference topics",
        slug: "s1",
    },
    {
        faTitle: "کیفیت عنوان مقاله",
        enTitle: "Quality of the article title",
        slug: "s2",
    },
    {
        faTitle: "تناسب عنوان با محتوا",
        enTitle: "Suitability of the title with the content",
        slug: "s3",
    },
    {
        faTitle: "تازگی محتوا",
        enTitle: "Freshness of the content",
        slug: "s4",
    },
    {
        faTitle: "کاربردی بودن محتوا",
        enTitle: "Practicality of the content",
        slug: "s5",
    },
    {
        faTitle: "مستند بودن محتوا",
        enTitle: "Documentary nature of the content",
        slug: "s6",
    },
    {
        faTitle: "کیفیت روش شناسی",
        enTitle: "Quality of methodology",
        slug: "s7",
    },
    {
        faTitle: "کیفیت نمایش و بازنمایی مناسب یافته ها",
        enTitle:
            "Quality of presentation and proper representation of findings",
        slug: "s8",
    },
    {
        faTitle: "قابلیت استقبال از سوی مخاطبان کنفرانس",
        enTitle: "Acceptability by conference audience",
        slug: "s9",
    },
    {
        faTitle: "ارزیابی کلی شما از مقاله",
        enTitle: "Your overall assessment of the article",
        slug: "s10",
    },
    {
        faTitle: "تصمیم نهایی",
        enTitle: "Final decision",
        slug: "s11",
    },
    {
        faTitle: "توضیحات، اصلاحات، و پیشنهادها",
        enTitle: "Comments, revisions, and suggestions",
        slug: "s12",
    },
];

export const seedJudgingArticles = async () => {
    // Assuming articles and users are already seeded and we just need to fetch them.
    let articles;
    let referees;

    try {
        articles = await Article.find();
        referees = await User.find({ "role.name": "referee" }); // Assuming a 'referee' role exists
        if (articles.length === 0 || referees.length === 0) {
            throw new Error("Required articles or referees not found!");
        }
    } catch (error) {
        console.error("Error fetching articles or referees:", error);
        return;
    }

    // Create a list of sample judging articles
    const judgingArticlesData = articles.map((article, index) => {
        return {
            article: article._id,
            referee: referees[index % referees.length]._id, // Cycle through referees
            assignmentDate: new Date(),
            files: ["somefile.pdf"], // Example file, adjust as necessary
            message: "Initial message",
            scientificMessage: "Scientific feedback",
            rates: rates.map((rate) => ({
                faTitle: rate.faTitle,
                enTitle: rate.enTitle,
                slug: rate.slug,
                rate: Math.floor(Math.random() * 101), // Random rating between 0 to 100
            })),
            status: judgingStatus[
                Math.floor(Math.random() * judgingStatus.length)
            ], // Random status
            refereeDate: new Date(),
        };
    });

    // Insert the sample judging articles into the database
    try {
        await JudgingArticle.deleteMany({});
        await JudgingArticle.insertMany(judgingArticlesData);
        console.log("Judging articles seeded successfully!");
    } catch (error) {
        console.error("Error seeding judging articles:", error);
    }
};

// This function can then be executed in your main seeding script or process.
