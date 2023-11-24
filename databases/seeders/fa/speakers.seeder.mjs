import casual from "casual";
import Speaker from "../../../app/models/speakers.model.mjs";
import User from "../../../app/models/user.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";
function translateTitleToEnglish(farsiTitle) {
    const titleTranslationMap = {
        "آینده هوش مصنوعی": "The Future of Artificial Intelligence",
        "سفر در زمان با هوش مصنوعی": "Time Travel with Artificial Intelligence",
        "خرید و فروش ملک با ارز دیجیتال":
            "Real Estate Trading with Digital Currency",
        "پلاک خوان ماشین": "Vehicle License Plate Recognition",
        "شناسایی دود با پردازش تصویر": "Smoke Detection with Image Processing",
        "راه و شهر سازی با توسعه ماشین":
            "Road and Urban Development with Machine Learning",
        "ساخت انواع توربین های بادی و خورشیدی توسط ربات":
            "Building Wind and Solar Turbines with Robots",
    };

    return titleTranslationMap[farsiTitle] || farsiTitle;
}

function translateDescriptionToEnglish(farsiDescription) {
    // Implement translation for descriptions
    // Placeholder: Returning the same description for simplicity
    return farsiDescription;
}

export const seedSpeakersFA = async () => {
    try {
        const users = await User.find().limit(30);
        if (users.length === 0) {
            console.log("کاربری یافت نشد. لطفاً ابتدا کاربران را seed کنید.");
            return;
        }

        const titles = [
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
            const farsiTitle = titles[i % titles.length];
            speakers.push({
                fa: {
                    title: farsiTitle,
                    description: "توضیح کوتاه و خلاصه در مورد نفرات سخنران",
                },
                en: {
                    title: translateTitleToEnglish(farsiTitle),
                    description: translateDescriptionToEnglish(
                        "Short and concise explanation about the speaker"
                    ),
                },
                user: users[i]._id,
            });
        }
        await Speaker.deleteMany({});
        await Speaker.insertMany(speakers);
        // await insertDocumentsDynamically(Speaker, speakers);
        console.log("سخنران‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن سخنران‌ها:", error);
    }
};
