import ArticleCategory from "../../app/models/articleCategory.model.mjs";

export const seedArticleCategory = async () => {
    const articleCategoriesData = [
        {
            title: "Technology",
            description: "Articles about the latest technology trends.",
            referees: [], // if referees are necessary, assign some users
        },
        {
            title: "Health",
            description: "Insights on various health topics.",
            referees: [],
        },
        // ... more sample categories
    ];

    try {
        await ArticleCategory.insertMany(articleCategoriesData);
        console.log("ArticleCategory seeded successfully!");
    } catch (error) {
        console.error("Error seeding ArticleCategory:", error);
    }
};
