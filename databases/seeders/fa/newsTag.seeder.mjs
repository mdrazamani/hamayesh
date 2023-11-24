import NewsTag from "../../../app/models/newsTag.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";
function translateTitleToEnglish(farsiTitle) {
    const titleTranslationMap = {
        "هوش مصنوعی": "Artificial Intelligence",
        "یادگیری ماشین": "Machine Learning",
        روباتیک: "Robotics",
        "پردازش زبان طبیعی": "Natural Language Processing",
        "بینایی ماشین": "Computer Vision",
        "بلاک چین": "Blockchain",
        "ارزهای دیجیتال": "Cryptocurrency",
        "امنیت بلاک چین": "Blockchain Security",
        "قراردادهای هوشمند": "Smart Contracts",
        "توکن‌ ها": "Tokens",
        // Add more translations as needed
    };

    return titleTranslationMap[farsiTitle] || farsiTitle;
}
export const seedNewsTagsFA = async () => {
    // Define some initial tags
    const tags = [
        // ...existing tags...
        { title: "هوش مصنوعی", slug: "artificial-intelligence" },
        { title: "یادگیری ماشین", slug: "machine-learning" },
        { title: "روباتیک", slug: "robotics" },
        { title: "پردازش زبان طبیعی", slug: "natural-language-processing" },
        { title: "بینایی ماشین", slug: "computer-vision" },
        { title: "بلاک چین", slug: "blockchain" },
        { title: "ارزهای دیجیتال", slug: "cryptocurrency" },
        { title: "امنیت بلاک چین", slug: "blockchain-security" },
        { title: "قراردادهای هوشمند", slug: "smart-contracts" },
        { title: "توکن‌ ها", slug: "tokens" },
        // Add more tags as needed...
    ].map((tag) => ({
        ...tag,
        fa: {
            title: tag.title,
        },
        en: {
            title: translateTitleToEnglish(tag.title),
        },
    }));

    let createdTags;
    try {
        // Insert tags into the database
        await NewsTag.deleteMany({});
        createdTags = await NewsTag.insertMany(tags);
        // createdTags = await insertDocumentsDynamically(NewsTag, tags);
        console.log("news tag seeded successfully");
    } catch (error) {
        console.error("news tag error", error);
        // If the seeding fails, we need to stop the process or handle the error appropriately
        throw error;
    }

    // Includes the new MongoDB ObjectIds of the created tags
    return createdTags;
};

// This function can be executed to seed multiple tags in one go.
