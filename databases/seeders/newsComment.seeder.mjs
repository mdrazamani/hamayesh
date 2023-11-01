import NewsComment from "../../app/models/newsComment.model.mjs";

export const seedNewsComments = async () => {
    const commentsData = [
        {
            comment: "Amazing developments in this area!",
            likeNumber: 5,
            userFirstName: "John",
            userLastName: "Doe",
            userEmail: "john.doe@example.com",
            userIp: "192.168.1.2",
            status: false,
        },
        {
            comment: "I love the content here!",
            likeNumber: 10,
            userFirstName: "Alice",
            userLastName: "Smith",
            userEmail: "alice.smith@example.com",
            userIp: "192.168.1.3",
            status: true,
        },
        {
            comment: "This is very informative.",
            likeNumber: 3,
            userFirstName: "Bob",
            userLastName: "Johnson",
            userEmail: "bob.johnson@example.com",
            userIp: "192.168.1.4",
            status: false,
        },
        {
            comment: "Great job on this article!",
            likeNumber: 7,
            userFirstName: "Emily",
            userLastName: "Davis",
            userEmail: "emily.davis@example.com",
            userIp: "192.168.1.5",
            status: true,
        },
        // Add more comments as needed...
    ];

    let createdComments;
    try {
        await NewsComment.deleteMany({});
        createdComments = await NewsComment.insertMany(commentsData);
        console.log("NewsComments seeded successfully!");
    } catch (error) {
        console.error("Error seeding NewsComments:", error);
    }

    return createdComments;
};

// This function can be executed to seed multiple comments at once.
