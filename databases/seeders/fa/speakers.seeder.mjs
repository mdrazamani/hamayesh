// import statements
import Speaker from "../../../app/models/speakers.model.mjs";
import User from "../../../app/models/user.model.mjs"; // وارد کردن مدل User

export const seedSpeakersFA = async () => {
    try {
        // دریافت برخی شناسه‌های کاربر از پایگاه داده‌ی خود. این فقط یک مثال است؛ بر اساس نیازهای خود تنظیم کنید.
        const users = await User.find().limit(2); // به عنوان مثال سه کاربر را بازیابی می‌کند
        if (users.length === 0) {
            console.log("کاربری یافت نشد. لطفاً ابتدا کاربران را seed کنید.");
            return;
        }

        // داده‌های نمونه - آرایه‌ای از اشیاء سخنران
        const speakers = [
            {
                title: "سخنران کلیدی در حوزه نوآوری",
                description:
                    "این سخنران در مورد روندهای نوآوری و فناوری صحبت می‌کند.",
                user: users[0]._id, // استفاده از شناسه‌ی کاربر بازیابی شده
                // ... هر فیلد دیگری که دارید
            },
            {
                title: "کارشناس امنیت سایبری",
                description:
                    "این سخنران به بررسی آخرین تهدیدها و دفاع‌های امنیتی می‌پردازد.",
                user: users[1]._id, // استفاده از شناسه‌ی کاربر بازیابی شده
                // ... هر فیلد دیگری که دارید
            },
            // ... سخنران‌های نمونه دیگر
        ];

        // درج داده‌های نمونه در پایگاه داده‌ی شما
        await Speaker.deleteMany({});
        await Speaker.insertMany(speakers);
        console.log("سخنران‌ها با موفقیت seed شدند!");
    } catch (error) {
        // رفع خطاهای درج
        console.error("خطا در seed کردن سخنران‌ها:", error);
    }
};
