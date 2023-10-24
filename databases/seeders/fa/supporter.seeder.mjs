import Supporter from "../../../app/models/supporter.model.mjs";

export const seedSupportersFA = async () => {
    const supporters = [
        {
            name: "کمپانی کولیزان",
            logo: "تست",
            supportType: "Financial",
            link: "www.colizan.com",
        },
        {
            name: "شرکت مثال",
            logo: "تست",
            supportType: "Financial",
            link: "www.example.com",
        },
        {
            name: "سازمان حامی",
            logo: "تست",
            supportType: "Financial",
            link: "www.supporter.org",
        },
        {
            name: "شرکت دیگر",
            logo: "تست",
            supportType: "Academic",
            link: "www.anothercompany.com",
        },
        // ... افزودن حامی‌های نمونه دیگر
    ];

    try {
        await Supporter.deleteMany({});
        await Supporter.insertMany(supporters);
        console.log("حامی‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن حامی‌ها:", error);
    }
};
