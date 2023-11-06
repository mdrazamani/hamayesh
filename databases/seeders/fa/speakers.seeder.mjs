import casual from "casual";
import Speaker from "../../../app/models/speakers.model.mjs";
import User from "../../../app/models/user.model.mjs";

export const seedSpeakersFA = async () => {
    try {
        const users = await User.find().limit(30);
        if (users.length === 0) {
            console.log("کاربری یافت نشد. لطفاً ابتدا کاربران را seed کنید.");
            return;
        }

        const title = [
            "آینده هوش مصنوعی",
            "سفر در زمان با هوش مصنوعی",
            "خرید و فروش ملک با ارز دیجیتال",
            "پلاک خوان ماشین",
            "شناسایی دود با پردازش تصویر",
            "راه و شهر سازی با توسعه ماشین",
            "ساخت انواع توربین های بادی و خورشیدی توسط ربات",
        ];

        const speakers = [];

        for (let i = 0; i < users.length; i++) {
            const topic = casual.sentence;

            speakers.push({
                title: title[i % title.length],
                description: "توضیح کوتاه و خلاصه در مورد نفرات سخنران",
                user: users[i].id,
            });
        }

        await Speaker.deleteMany({});
        await Speaker.insertMany(speakers);
        console.log("سخنران‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن سخنران‌ها:", error);
    }
};
