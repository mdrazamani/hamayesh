import Article from "../../app/models/article.model.mjs"; // Adjust the import path as necessary
import User from "../../app/models/user.model.mjs";
import ArticleCategory from "../../app/models/articleCategory.model.mjs";

export const seedArticles = async () => {
    // Assuming users and categories are already seeded and we just need to fetch them.
    // If not, you would need to create them similarly to the articles below.

    let users;
    let categories;

    try {
        users = await User.find();
        categories = await ArticleCategory.find();
        if (users.length === 0 || categories.length === 0) {
            throw new Error("Required users or categories not found!");
        }
    } catch (error) {
        console.error("Error fetching users or categories:", error);
        return;
    }

    // Create a list of sample articles
    const articlesData = [
        {
            title: "Innovations in Renewable Energy",
            description:
                "A detailed look at new technology driving today's clean energy initiatives.",
            categoryId: categories[0]._id, // Assign a category ID
            userId: users[0]._id, // Assign a user ID
            articleFiles: [
                {
                    title: "Research Paper",
                    mimetype: "application/pdf",
                    size: 400,
                },
                // ... other files
            ],
            presentationFiles: [
                {
                    title: "Slide Deck",
                    mimetype: "application/vnd.ms-powerpoint",
                    size: 1000,
                },
                // ... other files
            ],
            status: "success", // or "pending", or "failed"
            arbitration: {
                refereeId: users[1]._id, // Assign another user as a referee
                message: "All standards met.",
            },
        },
        // ... more sample articles
    ];

    // Insert the sample articles into the database
    try {
        await Article.insertMany(articlesData);
        console.log("Articles seeded successfully!");
    } catch (error) {
        console.error("Error seeding articles:", error);
    }
};

// This function can then be executed in your main seeding script or process.
