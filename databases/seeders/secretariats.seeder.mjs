// import statements
import Secretariat from "../../app/models/secretariat.model.mjs";
import User from "../../app/models/user.model.mjs"; // Importing the User model

export const seedSecretariats = async () => {
    try {
        // Fetch some user IDs from your database. This is just an example; adjust based on your needs.
        const users = await User.find().limit(2); // fetch two users, for instance
        if (users.length === 0) {
            console.log("No users found. Please seed users first.");
            return;
        }

        // Sample data - array of secretariat objects
        const secretariats = [
            {
                title: "Academic Secretariat",
                description:
                    "Handles academic affairs and educational resources.",
                boss: users[0]._id, // Using fetched user's ID
                users: [users[0]._id, users[1]._id], // Array of user IDs
                type: "academic", // valid type from your enum
            },
            {
                title: "Financial Secretariat",
                description:
                    "Responsible for financial planning and budgeting.",
                boss: users[1]._id, // Using fetched user's ID
                users: [users[0]._id, users[1]._id], // Array of user IDs
                type: "executive", // valid type from your enum
            },

            {
                title: "Financial Secretariat",
                description:
                    "Responsible for financial planning and budgeting.",
                boss: users[1]._id, // Using fetched user's ID
                users: [users[0]._id, users[1]._id], // Array of user IDs
                type: "policy", // valid type from your enum
            },
            // ... more sample secretariats
        ];

        // Inserting the sample data into your database
        await Secretariat.deleteMany({});
        await Secretariat.insertMany(secretariats);
        console.log("Secretariats seeded successfully!");
    } catch (error) {
        // Handling insertion errors
        console.error("Error seeding secretariats:", error);
    }
};
