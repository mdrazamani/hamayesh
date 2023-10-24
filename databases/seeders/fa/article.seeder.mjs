import Article from "../../../app/models/article.model.mjs"; // Adjust the import path as necessary
import User from "../../../app/models/user.model.mjs";
import ArticleCategory from "../../../app/models/articleCategory.model.mjs";

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
                {
                    title: "مقاله تحقیقاتی",
                    mimetype: "application/pdf",
                    size: 400,
                },
                {
                    title: "نمودارهای داده",
                    mimetype: "image/png",
                    size: 250,
                },
                {
                    title: "داده‌های تجربی",
                    mimetype: "application/zip",
                    size: 800,
                },
                // ... other files
            ],
            presentationFiles: [
                {
                    title: "اسلاید دسته",
                    mimetype: "application/vnd.ms-powerpoint",
                    size: 1000,
                },
                {
                    title: "ویدیوی پرزنتیشن",
                    mimetype: "video/mp4",
                    size: 1200,
                },
                // ... other files
            ],
            status: "success", // or "در انتظار", or "ناموفق"
            arbitration: {
                refereeId: users[1]._id, // Assign another user as a referee
                message: "تمامی استانداردها مورد تأیید قرار گرفته است.",
            },
        },
        {
            title: "پیشرفت‌های هوش مصنوعی",
            description:
                "بررسی آخرین پیشرفت‌های هوش مصنوعی و کاربردهای واقعی آن‌ها.",
            category: categories[0]._id,
            userId: users[1]._id,
            articleFiles: [
                {
                    title: "مقاله تحقیقاتی",
                    mimetype: "application/pdf",
                    size: 350,
                },
                {
                    title: "نمونه‌های کد هوش مصنوعی",
                    mimetype: "text/plain",
                    size: 600,
                },
                // ... other files
            ],
            presentationFiles: [
                {
                    title: "اسلایدهای دموی هوش مصنوعی",
                    mimetype: "application/vnd.ms-powerpoint",
                    size: 800,
                },
                // ... other files
            ],
            status: "success",
            arbitration: {
                refereeId: users[0]._id,
                message: "محتوای مطالعاتی با کیفیت و تحقیقات دقیق.",
            },
        },
        {
            title: "نوآوری‌های بهداشت: پزشکی از راه دور",
            description: "صعود پزشکی از راه دور و تأثیر آن در بهداشت مدرن.",
            category: categories[1]._id,
            userId: users[0]._id,
            articleFiles: [
                {
                    title: "مقاله تحقیقاتی",
                    mimetype: "application/pdf",
                    size: 450,
                },
                // ... other files
            ],
            presentationFiles: [
                {
                    title: "مطالعات موردی پزشکی از راه دور",
                    mimetype: "application/vnd.ms-powerpoint",
                    size: 950,
                },
                // ... other files
            ],
            status: "pending",
            arbitration: {
                refereeId: users[0]._id,
                message: "منتظر داده‌های اضافی برای بررسی هستیم.",
            },
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