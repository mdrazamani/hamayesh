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
            category: categories[0]._id, // Assign a category ID
            userId: users[0]._id, // Assign a user ID
            articleFiles: [
                {
                    title: "Research Paper",
                    mimetype: "application/pdf",
                    size: 400,
                },
                {
                    title: "Data Charts",
                    mimetype: "image/png",
                    size: 250,
                },
                {
                    title: "Experimental Data",
                    mimetype: "application/zip",
                    size: 800,
                },
                // ... other files
            ],
            presentationFiles: [
                {
                    title: "Slide Deck",
                    mimetype: "application/vnd.ms-powerpoint",
                    size: 1000,
                },
                {
                    title: "Presentation Video",
                    mimetype: "video/mp4",
                    size: 1200,
                },
                // ... other files
            ],
            status: "success", // or "pending", or "failed"
            arbitration: {
                refereeId: "", // Assign another user as a referee
                message: "All standards met.",
                rate: 0, // Example rating
                files: [], // Populate as necessary
            },
        },
        {
            title: "Advancements in Artificial Intelligence",
            description:
                "Exploring the latest AI breakthroughs and their real-world applications.",
            category: categories[0]._id,
            userId: users[1]._id,
            articleFiles: [
                {
                    title: "Research Paper",
                    mimetype: "application/pdf",
                    size: 350,
                },
                {
                    title: "AI Code Samples",
                    mimetype: "text/plain",
                    size: 600,
                },
                // ... other files
            ],
            presentationFiles: [
                {
                    title: "AI Demo Slides",
                    mimetype: "application/vnd.ms-powerpoint",
                    size: 800,
                },
                // ... other files
            ],
            status: "success",
            arbitrations: {
                refereeId: "", // Assign another user as a referee
                files: [], // Populate as necessary
                messages: "test 1",
                rate: 0, // Example rating
            },
        },
        {
            title: "Healthcare Innovations: Telemedicine",
            description:
                "The rise of telemedicine and its impact on modern healthcare.",
            category: categories[0]._id,
            userId: users[0]._id,
            articleFiles: [
                {
                    title: "Research Paper",
                    mimetype: "application/pdf",
                    size: 450,
                },
                // ... other files
            ],
            presentationFiles: [
                {
                    title: "Telemedicine Case Studies",
                    mimetype: "application/vnd.ms-powerpoint",
                    size: 950,
                },
                // ... other files
            ],
            status: "pending",
            arbitrations: {
                refereeId: "",
                files: [], // Populate as necessary
                messages: "test 2",
                rate: 0, // Example rating
            },
        },
        // ... more sample articles
    ];

    // Insert the sample articles into the database
    try {
        await Article.deleteMany({});
        await Article.insertMany(articlesData);
        console.log("Articles seeded successfully!");
    } catch (error) {
        console.error("Error seeding articles:", error);
    }
};

// This function can then be executed in your main seeding script or process.
