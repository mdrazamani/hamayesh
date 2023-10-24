import NewsCategory from "../../app/models/newsCategory.model.mjs";

export const seedNewsCategories = async () => {
    // Define some initial parent categories
    const parentCategories = [
        {
            title: "Technology",
            description: "All about the latest technology",
            slug: "technology",
            image: "tech-image-url",
            level: 1,
        },
        {
            title: "Health",
            description: "Covering health and wellness topics",
            slug: "health",
            image: "health-image-url",
            level: 1,
        },
        {
            title: "Sports",
            description: "Latest news in the sports industry",
            slug: "sports",
            image: "sports-image-url",
            level: 1,
        },
        // Add more parent categories as needed...
    ];

    let createdCategories;

    try {
        await NewsCategory.deleteMany({});
        // Insert parent categories into the database and retrieve them with their generated IDs
        const createdParentCategories = await NewsCategory.insertMany(
            parentCategories
        );

        // Extract the IDs of the parent categories
        const parentIds = createdParentCategories.map(
            (category) => category._id
        );

        // Define child categories, making sure to reference their parent categories
        const childCategories = [
            {
                title: "Artificial Intelligence",
                description: "Advancements in AI",
                slug: "artificial-intelligence",
                parent: parentIds[0], // Referring to "Technology"
                image: "ai-image-url",
                level: 2,
            },
            {
                title: "Nutrition",
                description: "Healthy eating tips and news",
                slug: "nutrition",
                parent: parentIds[1], // Referring to "Health"
                image: "nutrition-image-url",
                level: 2,
            },
            {
                title: "Football",
                description: "Updates on local and international football",
                slug: "football",
                parent: parentIds[2], // Referring to "Sports"
                image: "football-image-url",
                level: 2,
            },
            // Add more child categories as needed, referencing the appropriate parent...
        ];

        // Insert child categories into the database
        createdCategories = await NewsCategory.insertMany(childCategories);

        console.log("NewsCategories seeded successfully!");
    } catch (error) {
        console.error("Error seeding NewsCategory:", error);
        // Handle the error appropriately depending on your application's needs
    }
    return createdCategories;
};

// This function can be executed in your database setup or seeding script, or as needed in your setup process.
