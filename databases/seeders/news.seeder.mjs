// newsSeeder.js
import mongoose from "mongoose";
import News from "../../app/models/news.model.mjs";
import User from "../../app/models/user.model.mjs";
import { seedNewsComments } from "./newsComment.seeder.mjs"; // import the function from step 1
import { seedNewsTags } from "./newsTag.seeder.mjs";
import { seedNewsCategories } from "./newsCategory.seeder.mjs";

export const seedNews = async () => {
    let createdCategories = await seedNewsCategories();

    console.log(createdCategories);

    let createdComments = await seedNewsComments();
    let commentIds = createdComments.map((comment) => comment._id);

    let createdTags = await seedNewsTags();
    let tagIds = createdTags.map((tag) => tag._id);

    const user = await User.findOne({ firstName: "Mohammadreza" });

    // Create news data, incorporating the comment IDs
    const newsData = [
        {
            title: "Exciting developments in tech",
            description: "Latest news in the tech industry...",
            visitNumber: 100,
            slug: "exciting-developments-in-tech",
            writer: user._id,
            image: "http://example.com/path/to/image.jpg",
            categoryId: createdCategories[0]._id, // replace with actual category ID
            tags: tagIds, // replace with actual tag IDs
            comments: commentIds, // the comment IDs from the created comments
            publishDate: new Date(),
            SpecialDate: new Date(),
        },
        // ... more news items
    ];

    try {
        await News.insertMany(newsData);
        console.log("News seeded successfully!");
    } catch (error) {
        console.error("Error seeding news:", error);
    }
};

// This function can then be executed in your seeding script or process.
