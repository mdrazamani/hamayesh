import NewsTag from "../../../app/models/newsTag.model.mjs";

export const seedNewsTagsFA = async () => {
    // تعریف برخی از تگ‌های ابتدایی
    const tags = [
        { title: "تکنولوژی", slug: "technology" },
        { title: "علم", slug: "science" },
        { title: "سلامتی", slug: "health" },
        { title: "ورزش", slug: "sports" },
        { title: "سرگرمی", slug: "entertainment" },
        // اضافه کردن تگ‌های بیشتر به تعداد نیازمندی...
    ];

    let createdTags;
    try {
        // درج تگ‌ها در پایگاه داده
        await NewsTag.deleteMany({});
        createdTags = await NewsTag.insertMany(tags);
        console.log("تگ‌های اخبار با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن تگ‌های اخبار:", error);
        // اگر seed کردن ناموفق باشد، باید فرآیند را متوقف کنیم یا خطا را به‌صورت مناسب اداره کنیم
        throw error;
    }

    // شامل شناسه‌های جدید MongoDB ObjectIds تگ‌های ایجاد شده
    return createdTags;
};

// این تابع می‌تواند برای seed کردن چندین تگ به صورت یکجا اجرا شود.
