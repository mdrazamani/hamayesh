import User from "../models/user.model.mjs";

export const seedUsers = async () => {
    const users = [
        {
            username: "JohnDoe",
            password: "password123",
            email: "john@example.com",
        },
        // Add more users as needed
    ];

    await User.insertMany(users);
};
