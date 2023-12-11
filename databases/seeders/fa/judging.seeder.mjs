import JudgingArticle from "../../../app/models/JudgingArticles.mjs"; // Adjust the import path as necessary
import Article from "../../../app/models/article.model.mjs";
import User from "../../../app/models/user.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedJudgingArticles = async () => {
    // Assuming articles and users are already seeded and we just need to fetch them.
    let articles;
    let referees;

    try {
        articles = await Article.find();
        referees = await User.find({ role: "referee" }); // Assuming a 'referee' role exists
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
                title: rate.enTitle,
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
        await insertDocumentsDynamically(JudgingArticle, judgingArticlesData);
        console.log("Judging articles seeded successfully!");
    } catch (error) {
        console.error("Error seeding judging articles:", error);
    }
};

// This function can then be executed in your main seeding script or process.
