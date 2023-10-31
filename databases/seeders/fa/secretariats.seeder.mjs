// import statements
import Secretariat from "../../../app/models/secretariat.model.mjs";
import User from "../../../app/models/user.model.mjs"; // وارد کردن مدل User

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
                type: "conferance", // نوع معتبر از انتخاب‌های شما
            },
            {
                title: "دبیرخانه سیاستگذاری",
                description:
                    "مسئولیت‌های سیاستگذاری و برنامه‌ریزی سیاسی را دارد.",
                boss: users[1]._id, // استفاده از شناسه‌ی کاربر بازیابی شده
                users: [users[0]._id, users[1]._id], // آرایه‌ای از شناسه‌های کاربران
                type: "policy", // نوع معتبر از انتخاب‌های شما
            },
            // ... دبیرخانه‌های نمونه دیگر
        ];

        // درج داده‌های نمونه در پایگاه داده‌ی شما
        await Secretariat.deleteMany({});
        await Secretariat.insertMany(secretariats);
        console.log("دبیرخانه‌ها با موفقیت seed شدند!");
    } catch (error) {
        // رفع خطاهای درج
        console.error("خطا در seed کردن دبیرخانه‌ها:", error);
    }
};
