import Organizer from "../../../app/models/organizer.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";

export const seedOrganizersFA = async () => {
    const state = await State.findOne({ state: "البرز" });
    const city = await City.findOne({ city: "کرج" });

    const organizers = [
        {
            name: "کمپانی کولیزان",
            logo: "تست",
            link: "www.colizan.com",
            isMain: true,
            details: {
                address: {
                    state: state._id,
                    city: city._id,
                    address: "شهرک شاهین ویلا، بنیاد ۲۲ بهمن جنوبی",
                    longitude: 123456,
                    latitude: 654321,
                },
                description: "یک شرکت بزرگ در حوزه فناوری اطلاعات",
                emails: ["mdrazamani@gmail.com", "mdracolizan@gmail.com"],
                phoneNumbers: ["۰۲۶۳۴۵۱۲۴۰۵", "۰۲۶۳۴۵۶۶۶۶۵"],
            },
        },
        {
            name: "سازمان برگزارکننده ی مورد دیگر",
            logo: "تست",
            link: "www.example.com",
            isMain: false,
            details: {
                address: {
                    state: state._id,
                    city: city._id,
                    address: "آدرس دیگر",
                    longitude: 789012,
                    latitude: 987654,
                },
                description: "یک توضیح در مورد این سازمان",
                emails: ["example@example.com", "info@example.com"],
                phoneNumbers: ["۰۲۶۳۴۵۱۲۳۴۵", "۰۲۶۳۴۵۶۷۸۹۰"],
            },
        },
        // ... افزودن سازمان‌های نمونه دیگر
    ];

    try {
        await Organizer.deleteMany({});
        await Organizer.insertMany(organizers);
        console.log("سازمان‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن سازمان‌ها:", error);
    }
};
