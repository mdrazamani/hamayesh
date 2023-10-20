import NewsTag from "../../app/models/newsTag.model.mjs";

export const seedNewsTags = async () => {
    // Define some initial tags
    const tags = [
        { title: "Technology", slug: "technology" },
        { title: "Science", slug: "science" },
        // more tags...
    ];

    let createdTags;
    try {
        // Insert tags into the database
        createdTags = await NewsTag.insertMany(tags);
        console.log("NewsTags seeded successfully!");
    } catch (error) {
        console.error("Error seeding NewsTags:", error);
        // If seeding fails, we should stop the process or handle the error appropriately
        throw error;
    }

    // Return created tag entries, which include their new MongoDB ObjectIds
    return createdTags;
};
