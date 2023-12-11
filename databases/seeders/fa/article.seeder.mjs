import Article from "../../../app/models/article.model.mjs"; // Adjust the import path as necessary
import User from "../../../app/models/user.model.mjs";
import ArticleCategory from "../../../app/models/articleCategory.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedArticlesFA = async () => {
    let users;
    let categories;

    try {
        users = await User.find();
        categories = await ArticleCategory.find();
        if (users.length === 0 || categories.length === 0) {
            throw new Error("Required users or categories not found!");
        }
    } catch (error) {
        console.error("Error fetching users or categories:", error);
        return;
    }

    // Create a list of sample articles
    const articlesData = [
        {
            fa: {
                title: "نوآوری‌ها در انرژی تجدیدپذیر",
                description:
                    "یک نگاه دقیق به فناوری‌های جدید در تحرکی نظیف امروز.",
            },
            en: {
                title: "Innovations in Renewable Energy",
                description:
                    "A detailed look at new technologies in today's clean mobility.",
            },
            category: categories[0]._id,
            userId: users[0]._id,
            articleFiles: [
                "public/uploads/articleFiles/test33.pdf",
                "public/uploads/articleFiles/test34.pdf",
            ],
            presentationFiles: [
                "public/uploads/articleFiles/per.pdf",
                "public/uploads/articleFiles/tasis.pdf",
            ],
            status: "review",
            rate: Math.floor(Math.random() * 101),
        },
        {
            fa: {
                title: "تأثیر فناوری در آموزش",
                description: "بررسی نقش فناوری‌های نوین در تحول آموزشی.",
            },
            en: {
                title: "The Impact of Technology on Education",
                description:
                    "Exploring the role of modern technologies in educational transformation.",
            },
            category: categories[1]._id,
            userId: users[1]._id,
            articleFiles: [
                "public/uploads/articleFiles/edu1.pdf",
                "public/uploads/articleFiles/edu2.pdf",
            ],
            presentationFiles: [
                "public/uploads/articleFiles/edu_presentation1.pdf",
            ],
            status: "accepted",
            rate: Math.floor(Math.random() * 101),
        },
        {
            fa: {
                title: "پیشرفت‌های جدید در پزشکی ژنتیک",
                description: "کشفیات و نوآوری‌های اخیر در زمینه ژنتیک و پزشکی.",
            },
            en: {
                title: "New Advances in Genetic Medicine",
                description:
                    "Recent discoveries and innovations in genetics and medicine.",
            },
            category: categories[2]._id,
            userId: users[2]._id,
            articleFiles: [
                "public/uploads/articleFiles/genetic1.pdf",
                "public/uploads/articleFiles/genetic2.pdf",
            ],
            presentationFiles: [],
            status: "new",
            rate: Math.floor(Math.random() * 101),
        },
        {
            fa: {
                title: "مهندسی نرم‌افزار و تحولات آینده",
                description:
                    "نگاهی به آینده مهندسی نرم‌افزار و تکنولوژی‌های نوظهور.",
            },
            en: {
                title: "Software Engineering and Future Trends",
                description:
                    "A look into the future of software engineering and emerging technologies.",
            },
            category: categories[3]._id,
            userId: users[3]._id,
            articleFiles: [
                "public/uploads/articleFiles/software1.pdf",
                "public/uploads/articleFiles/software2.pdf",
            ],
            presentationFiles: [
                "public/uploads/articleFiles/software_presentation.pdf",
            ],
            status: "pending",
            rate: Math.floor(Math.random() * 101),
        },
        // ... more sample articles
    ];

    // Insert the sample articles into the database
    try {
        await Article.deleteMany({});
        await insertDocumentsDynamically(Article, articlesData);
        console.log("مقالات با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن مقالات:", error);
    }
};

// This function can then be executed in your main seeding script or process.
