// import statements
import Secretariat from "../../../app/models/secretariat.model.mjs";
import User from "../../../app/models/user.model.mjs"; // وارد کردن مدل User
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

function translateTitleToEnglish(farsiTitle) {
    const titleTranslationMap = {
        "دبیرخانه علمی": "Academic Secretariat",
        "دبیرخانه اجرایی": "Executive Secretariat",
        "دبیرخانه سیاستگذاری": "Policy Secretariat",
        ریاست: "Presidency",
        // Add more translations as needed
    };

    return titleTranslationMap[farsiTitle] || farsiTitle;
}

function translateDescriptionToEnglish(farsiDescription) {
    const descriptionTranslationMap = {
        "مسائل تحصیلی و منابع آموزشی را پیگیری می‌کند.":
            "Handles educational matters and academic resources.",
        "مسئول برنامه‌ریزی مالی و بودجه‌بندی است.":
            "Responsible for financial planning and budgeting.",
        "مسئولیت‌های سیاستگذاری و برنامه‌ریزی سیاسی را دارد.":
            "Manages policy-making and political planning.",
        "رئیس محترم همایش": "Honorable Conference President",
        // Add more translations as needed
    };

    return descriptionTranslationMap[farsiDescription] || farsiDescription;
}

export const seedSecretariatsFA = async () => {
    try {
        // دریافت برخی شناسه‌های کاربر از پایگاه داده‌ی خود. این فقط یک مثال است؛ بر اساس نیازهای خود تنظیم کنید.
        const users = await User.find().limit(2); // به عنوان مثال دو کاربر را بازیابی می‌کند
        if (users.length === 0) {
            console.log("کاربری یافت نشد. لطفاً ابتدا کاربران را seed کنید.");
            return;
        }

        // داده‌های نمونه - آرایه‌ای از اشیاء دبیرخانه
        const secretariats = [
            {
                title: "دبیرخانه علمی",
                description: "مسائل تحصیلی و منابع آموزشی را پیگیری می‌کند.",
                boss: users[0]._id, // استفاده از شناسه‌ی کاربر بازیابی شده
                users: [users[0]._id, users[1]._id], // آرایه‌ای از شناسه‌های کاربران
                type: "academic", // نوع معتبر از انتخاب‌های شما
            },
            {
                title: "دبیرخانه اجرایی",
                description: "مسئول برنامه‌ریزی مالی و بودجه‌بندی است.",
                boss: users[1]._id, // استفاده از شناسه‌ی کاربر بازیابی شده
                users: [users[0]._id, users[1]._id], // آرایه‌ای از شناسه‌های کاربران
                type: "executive", // نوع معتبر از انتخاب‌های شما
            },
            {
                title: "دبیرخانه سیاستگذاری",
                description:
                    "مسئولیت‌های سیاستگذاری و برنامه‌ریزی سیاسی را دارد.",
                boss: users[1]._id, // استفاده از شناسه‌ی کاربر بازیابی شده
                users: [users[0]._id, users[1]._id], // آرایه‌ای از شناسه‌های کاربران
                type: "policy", // نوع معتبر از انتخاب‌های شما
            },
            {
                title: "ریاست",
                description: "رئیس محترم همایش",
                boss: users[0]._id, // استفاده از شناسه‌ی کاربر بازیابی شده
                // users: [], // آرایه‌ای از شناسه‌های کاربران
                type: "conferance", // نوع معتبر از انتخاب‌های شما
            },
            // ... دبیرخانه‌های نمونه دیگر
        ].map((secretariat) => ({
            fa: {
                title: secretariat.title,
                description: secretariat.description,
            },
            en: {
                title: translateTitleToEnglish(secretariat.title),
                description: translateDescriptionToEnglish(
                    secretariat.description
                ),
            },
            boss: secretariat.boss,
            users: secretariat.users,
            type: secretariat.type,
        }));
        // درج داده‌های نمونه در پایگاه داده‌ی شما
        await Secretariat.deleteMany({});
        await Secretariat.insertMany(secretariats);
        // await insertDocumentsDynamically(Secretariat, secretariats);
        console.log("دبیرخانه‌ها با موفقیت seed شدند!");
    } catch (error) {
        // رفع خطاهای درج
        console.error("خطا در seed کردن دبیرخانه‌ها:", error);
    }
};
