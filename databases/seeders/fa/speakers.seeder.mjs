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

        const speakers = [];

        for (let i = 0; i < 30; i++) {
            const topic = casual.sentence;

            speakers.push({
                title: `سخنرانی در مورد ${topic}`,
                description: casual.text,
                user: users[i]._id,
            });
        }

        await Speaker.deleteMany({});
        await Speaker.insertMany(speakers);
        console.log("سخنران‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن سخنران‌ها:", error);
    }
};
