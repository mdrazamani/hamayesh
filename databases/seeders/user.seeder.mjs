import User from "../../app/models/user.model.mjs";

export const seedUsers = async () => {
    const user = [
        {
            username: "JohnDoe",
            password: "password123",
            email: "john@example.com",
        },
        // Add more users as needed
    ];

    try {
        await User.insertMany(user);
        console.log("Users seeded successfully!");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};
