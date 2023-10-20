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
            status: true, // assuming this means the comment is approved or visible
        },
        // ... more comments
    ];

    let createdComments;
    try {
        createdComments = await NewsComment.insertMany(commentsData);
        console.log("NewsComments seeded successfully!");
    } catch (error) {
        console.error("Error seeding NewsComments:", error);
    }

    return createdComments; // return the array of created comments, with their generated IDs
};
