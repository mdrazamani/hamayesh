import NewsCategory from "../../../app/models/newsCategory.model.mjs";

export const seedNewsCategoriesFA = async () => {
    // تعریف دسته‌بندی‌های اصلی ابتدایی
    const parentCategories = [
        {
            title: "تکنولوژی",
            description: "تمامی اخبار مربوط به تکنولوژی جدید",
            slug: "technology",
            image: "آدرس-تصویر-تکنولوژی",
            level: 1,
        },
        {
            title: "سلامتی",
            description: "پوشش موضوعات بهداشت و سلامت",
            slug: "health",
            image: "آدرس-تصویر-سلامتی",
            level: 1,
        },
        {
            title: "ورزش",
            description: "آخرین اخبار در صنعت ورزش",
            slug: "sports",
            image: "آدرس-تصویر-ورزش",
            level: 1,
        },
        // اضافه کردن دسته‌بندی‌های اصلی دیگر به نیاز
    ];

    let createdCategories;

    try {
        await NewsCategory.deleteMany({});
        // درج دسته‌بندی‌های اصلی در پایگاه داده و بازیابی آنها با شناسه‌های تولید شده
        const createdParentCategories = await NewsCategory.insertMany(
            parentCategories
        );

        // استخراج شناسه‌های دسته‌بندی‌های اصلی
        const parentIds = createdParentCategories.map(
            (category) => category._id
        );

        // تعریف دسته‌بندی‌های زیرمجموعه با توجه به دسته‌بندی‌های اصلی
        const childCategories = [
            {
                title: "هوش مصنوعی",
                description: "پیشرفت‌های در حوزه هوش مصنوعی",
                slug: "artificial-intelligence",
                parent: parentIds[0], // ارتباط با "تکنولوژی"
                image: "آدرس-تصویر-هوش-مصنوعی",
                level: 2,
            },
            {
                title: "تغذیه",
                description: "نکات تغذیه سالم و اخبار مرتبط",
                slug: "nutrition",
                parent: parentIds[1], // ارتباط با "سلامتی"
                image: "آدرس-تصویر-تغذیه",
                level: 2,
            },
            {
                title: "فوتبال",
                description: "آخرین اخبار فوتبال محلی و بین‌المللی",
                slug: "football",
                parent: parentIds[2], // ارتباط با "ورزش"
                image: "آدرس-تصویر-فوتبال",
                level: 2,
            },
            // اضافه کردن دسته‌بندی‌های زیرمجموعه دیگر به نیاز
        ];

        // درج دسته‌بندی‌های زیرمجموعه در پایگاه داده
        createdCategories = await NewsCategory.insertMany(childCategories);

        console.log("دسته‌بندی‌های اخبار با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن دسته‌بندی‌های اخبار:", error);
        // بسته به نیازهای برنامه‌ی شما، خطا را به‌طور مناسب اداره کنید
    }
    return createdCategories;
};

// این تابع می‌تواند در اسکریپت یا فرآیند seeding پایگاه داده‌ی شما اجرا شود.
