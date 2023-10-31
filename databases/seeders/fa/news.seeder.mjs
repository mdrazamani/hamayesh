import News from "../../../app/models/news.model.mjs";
import User from "../../../app/models/user.model.mjs";
import { seedNewsCommentsFA } from "./newsComment.seeder.mjs"; // import the function from step 1
import { seedNewsTagsFA } from "./newsTag.seeder.mjs";
import { seedNewsCategoriesFA } from "./newsCategory.seeder.mjs";

export const seedNewsFA = async () => {
    let createdCategories = await seedNewsCategoriesFA();
    let createdComments = await seedNewsCommentsFA();
    let commentIds = createdComments.map((comment) => comment._id);
    let createdTags = await seedNewsTagsFA();
    let tagIds = createdTags.map((tag) => tag._id);

    const user = await User.findOne();

    // Create news data, incorporating the comment IDs
    const newsData = [
        {
            title: "تکنولوژی: آخرین اخبار",
            description: "آخرین اخبار صنعت تکنولوژی...",
            visitNumber: 100,
            slug: "akharin-akhbar-taknoloji",
            writer: user._id,
            image: "http://example.com/path/to/image.jpg",
            category: createdCategories[0]._id,
            tags: tagIds,
            comments: commentIds,
            publishDate: new Date(),
            specialDate: new Date(),
        },
        {
            title: "کشف‌های علمی جدید",
            description: "کشف‌های جدید در دنیای علم...",
            visitNumber: 50,
            slug: "kasf-haye-olmi-jadid",
            writer: user._id,
            image: "http://example.com/path/to/another-image.jpg",
            category: createdCategories[1]._id,
            tags: tagIds.slice(0, 2),
            comments: commentIds.slice(2, 4),
            publishDate: new Date(),
            specialDate: new Date(),
        },
    ];

    try {
        await News.deleteMany({});
        await News.insertMany(newsData);
        console.log("News seeded successfully!");
    } catch (error) {
        console.error("Error seeding news:", error);
    }
};

// This function can then be executed in your seeding script or process.
