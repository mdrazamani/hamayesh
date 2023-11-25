import Article from "../../../app/models/article.model.mjs"; // Adjust the import path as necessary
import User from "../../../app/models/user.model.mjs";
import ArticleCategory from "../../../app/models/articleCategory.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedArticlesFA = async () => {
    // Assuming users and categories are already seeded and we just need to fetch them.
    // If not, you would need to create them similarly to the articles below.

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
            title: "نوآوری‌ها در انرژی تجدیدپذیر",
            description: "یک نگاه دقیق به فناوری‌های جدید در تحرکی نظیف امروز.",
            category: categories[0]._id, // Assign a category ID
            userId: users[0]._id, // Assign a user ID
            articleFiles: [
                "public/uploads/articleFiles/test33.pdf",
                "public/uploads/articleFiles/test34.pdf",
            ],
            presentationFiles: [
                "public/uploads/articleFiles/per.pdf",
                "public/uploads/articleFiles/tasis.pdf",
            ],
            status: "success", // or "در انتظار", or "ناموفق"
            arbitration: {
                refereeId: users[1]._id, // Assign another user as a referee
                files: [], // Populate as necessary
                message: "test 1",
                rate: 4, // Example rating
            },
        },
        {
            title: "پیشرفت‌های هوش مصنوعی",
            description:
                "بررسی آخرین پیشرفت‌های هوش مصنوعی و کاربردهای واقعی آن‌ها.",
            category: categories[0]._id,
            userId: users[1]._id,
            articleFiles: [],
            presentationFiles: [],
            status: "success",
            arbitration: {
                refereeId: users[0]._id,
                files: [], // Populate as necessary
                message: "test 2",
                rate: 5, // Example rating
            },
        },
        {
            title: "نوآوری‌های بهداشت: پزشکی از راه دور",
            description: "صعود پزشکی از راه دور و تأثیر آن در بهداشت مدرن.",
            category: categories[1]._id,
            userId: users[0]._id,
            articleFiles: [],
            presentationFiles: [],
            status: "pending",
            arbitration: {
                refereeId: users[0]._id,
                files: [], // Populate as necessary
                message: "test 3",
                rate: 5, // Example rating
            },
        },
        // ... more sample articles
    ];

    // Insert the sample articles into the database
    try {
        await Article.deleteMany({});
        // await Article.insertMany(articlesData);
        await insertDocumentsDynamically(Article, articlesData);
        console.log("مقالات با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن مقالات:", error);
    }
};

// This function can then be executed in your main seeding script or process.
