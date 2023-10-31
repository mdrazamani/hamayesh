import News from "../../app/models/news.model.mjs";
import User from "../../app/models/user.model.mjs";
import { seedNewsComments } from "./newsComment.seeder.mjs"; // import the function from step 1
import { seedNewsTags } from "./newsTag.seeder.mjs";
import { seedNewsCategories } from "./newsCategory.seeder.mjs";

export const seedNews = async () => {
    let createdCategories = await seedNewsCategories();
    let createdComments = await seedNewsComments();
    let commentIds = createdComments.map((comment) => comment._id);
    let createdTags = await seedNewsTags();
    let tagIds = createdTags.map((tag) => tag._id);

    const user = await User.findOne();

    // Create news data, incorporating the comment IDs
    const newsData = [
        {
            title: "Exciting developments in tech",
            description: "Latest news in the tech industry...",
            visitNumber: 100,
            slug: "exciting-developments-in-tech",
            writer: user._id,
            image: "http://example.com/path/to/image.jpg",
            category: createdCategories[0]._id, // Replace with actual category ID
            tags: tagIds, // Replace with actual tag IDs
            comments: commentIds, // The comment IDs from the created comments
            publishDate: new Date(),
            specialDate: new Date(),
        },
        {
            title: "New scientific discoveries",
            description: "Breaking discoveries in the world of science...",
            visitNumber: 50,
            slug: "new-scientific-discoveries",
            writer: user._id,
            image: "http://example.com/path/to/another-image.jpg",
            category: createdCategories[1]._id, // Replace with actual category ID
            tags: tagIds.slice(0, 2), // Replace with actual tag IDs (e.g., first two tags)
            comments: commentIds.slice(2, 4), // Use different comments for this news item
            publishDate: new Date(),
            specialDate: new Date(),
        },
        // Add more news items as needed...
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
