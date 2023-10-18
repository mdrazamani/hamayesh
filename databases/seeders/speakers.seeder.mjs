// import statements
import Speaker from "../../app/models/speakers.model.mjs";
import User from "../../app/models/user.model.mjs"; // Importing the User model

export const seedSpeakers = async () => {
    try {
        // Fetch some user IDs from your database. This is just an example; adjust based on your needs.
        const users = await User.find().limit(2); // fetch two users, for instance
        if (users.length === 0) {
            console.log("No users found. Please seed users first.");
            return;
        }

        // Sample data - array of speaker objects
        const speakers = [
            {
                title: "Keynote Speaker on Innovation",
                description:
                    "This speaker will discuss trends in innovation and technology.",
                user: users[0]._id, // Using fetched user's ID
                // ... any other Speaker fields, if you have them
            },
            {
                title: "Cybersecurity Expert",
                description:
                    "This speaker will delve into the latest in cybersecurity threats and defenses.",
                user: users[1]._id, // Using fetched user's ID
                // ... any other Speaker fields, if you have them
            },
            // ... more sample speakers
        ];

        // Inserting the sample data into your database
        await Speaker.insertMany(speakers);
        console.log("Speakers seeded successfully!");
    } catch (error) {
        // Handling insertion errors
        console.error("Error seeding speakers:", error);
    }
};
