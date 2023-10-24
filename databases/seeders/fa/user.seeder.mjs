import User from "../../../app/models/user.model.mjs";
import bcrypt from "bcrypt";
import Role from "../../../app/models/role.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";

export const seedUsersFA = async () => {
    // ابتدا نقش‌های 'admin' و 'user' را در پایگاه داده پیدا کنید تا از شناسه‌های آنها استفاده کنید.
    const adminRole = await Role.findOne({ name: "admin" });
    const userRole = await Role.findOne({ name: "user" });

    const state = await State.findOne({ state: "البرز" });
    const city = await City.findOne({ city: "کرج" });
    // اگر این نقش‌ها پیدا نشوند، ممکن است نیاز به اجرای seed آنها داشته باشید یا مدل‌های نقش‌های خود را بررسی کنید.

    // کاربرانی که می‌خواهید به پایگاه داده seed کنید را تعریف کنید.
    // شامل فیلدهای جدیدی که به مدل خود اضافه کرده‌اید باشد.
    const users = [
        {
            firstName: "محمدرضا",
            lastName: "زمانی",
            phoneNumber: "09108494221",
            password: await bcrypt.hash("Password123@", 10),
            email: "mohsen.rezvani.rad33@gmail.com", // تغییر داده شده تا اشتباهی با 'john@example.com' اشتباه نشود
            emailVerifiedAt: null, // یا new Date() اگر ایمیل تایید شده تلقی می‌شود
            role: {
                id: adminRole._id,
                name: adminRole.name, // نام نقش ادمین از نقش بازیابی شده
            },
            profileImage: null, // یا مسیری به تصویر پیش‌فرض ارائه دهید
            lastLoginAt: null, // می‌تواند به زمان کنونی به‌روز شود اگر نیاز دارید
            national_id: "0012345678", // باید یک شناسه ملی ایران معتبر باشد
            gender: "male", // یا مقدار مناسب دیگری
            study_field: "علوم کامپیوتر",
            degree: "کارشناسی ارشد",
            institute: "موسسه فناوری",
            country: "ایران",
            job: "مهندس",
            state: state._id,
            city: city._id,
            deletedAt: null, // در نظر گرفته شده که کاربر فعال است
        },

        {
            firstName: "محسن",
            lastName: "رضوانی",
            phoneNumber: "09330111568",
            password: await bcrypt.hash("Password123@", 10),
            email: "rezvani@example.com", // تغییر داده شده تا اشتباهی با 'john@example.com' اشتباه نشود
            emailVerifiedAt: null, // یا new Date() اگر ایمیل تایید شده تلقی می‌شود
            role: {
                id: userRole._id,
                name: userRole.name, // نام نقش کاربر از نقش بازیابی شده
            },
            profileImage: null, // یا مسیری به تصویر پیش‌فرض ارائه دهید
            lastLoginAt: null, // می‌تواند به زمان کنونی به‌روز شود اگر نیاز دارید
            national_id: "0012345679", // باید یک شناسه ملی ایران معتبر باشد
            gender: "male", // یا مقدار مناسب دیگری
            study_field: "علوم کامپیوتر",
            degree: "کارشناسی ارشد",
            institute: "موسسه فناوری",
            country: "ایران",
            job: "مهندس",
            state: state._id,
            city: city._id,
            deletedAt: null, // در نظر گرفته شده که کاربر فعال است
        },
        // ... کاربران دیگر
    ];

    // کاربران را در پایگاه داده درج کنید.
    try {
        await User.deleteMany({}); // اختیاری: ابتدا مجموعه کاربر را پاک کنید. با این کار تمام داده‌های موجود حذف می‌شوند، پس با احتیاط عمل کنید.
        await User.insertMany(users);
        console.log("کاربران با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن کاربران:", error);
    }
};
