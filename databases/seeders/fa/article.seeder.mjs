import Article from "../../../app/models/article.model.mjs"; // Adjust the import path as necessary
import User from "../../../app/models/user.model.mjs";
import ArticleCategory from "../../../app/models/articleCategory.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

const ArticleStatusLog = [
    {
        title: "اضافه شده",
        status: "new",
        textColor: "text-primary",
    },
    {
        title: "ارسال به کاربر برای بازنگری",
        status: "review",
        textColor: "text-warning",
    },
    {
        title: "تغییر یافته توسط کاربر",
        status: "changed",
        textColor: "text-primary",
    },
    {
        title: "بررسی شده توسط داور",
        status: "reviewed",
        textColor: "text-primary",
    },
    {
        title: "بررسی مجدد توسط داور",
        status: "reviewedAgain",
        textColor: "text-primary",
    },
    {
        title: "ارسال شده به داوران",
        status: "pending",
        textColor: "text-primary",
    },
    {
        title: "رد شده",
        status: "failed",
        textColor: "text-danger",
    },
    {
        title: "تائید شده",
        status: "accepted",
        textColor: "text-success",
    },
];

const getRandomLogs = () => {
    // Start with the 'new' status
    let logs = [
        {
            ...ArticleStatusLog.find((log) => log.status === "new"),
            date: new Date(), // Assigning the current date
        },
    ];

    // Shuffle the remaining logs, excluding 'new', 'failed', and 'accepted'
    const otherLogs = ArticleStatusLog.filter(
        (log) =>
            log.status !== "new" &&
            log.status !== "failed" &&
            log.status !== "accepted"
    ).sort(() => 0.5 - Math.random());

    // Add a random number of other logs
    logs.push(
        ...otherLogs
            .slice(0, Math.floor(Math.random() * otherLogs.length))
            .map((log) => ({
                ...log,
                date: new Date(), // Assigning the current date
            }))
    );

    // Always end with 'accepted' or 'failed', randomly chosen
    const endStatus = ["failed", "accepted"][Math.floor(Math.random() * 2)];

    logs.push({
        ...ArticleStatusLog.find((log) => log.status === endStatus),
        date: new Date(), // Assigning the current date
    });

    return logs;
};

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
            logs: getRandomLogs(),
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
            logs: getRandomLogs(),
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
            logs: getRandomLogs(),
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
            logs: getRandomLogs(),
        },
        // ... more sample articles
    ];

    // Insert the sample articles into the database
    try {
        await Article.deleteMany({});
        await Article.insertMany(articlesData);
        console.log("مقالات با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن مقالات:", error);
    }
};

// This function can then be executed in your main seeding script or process.
