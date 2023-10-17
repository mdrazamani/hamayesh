import State from "../../app/models/state.model.mjs"; // Import your State model
import { createPath } from "../../config/tools.mjs";
import fs from "fs";

// Function to seed states
export const seedStates = async () => {
    // Define the states data. This would be imported or read from your 'states.json' file
    // For the purpose of this example, I'll use a placeholder for the states array.

    const statePath = createPath(
        "../../public/dev-data/states.json",
        import.meta.url
    );

    // Insert states into the database.
    try {
        const data = fs.readFileSync(statePath, "utf-8");
        const states = JSON.parse(data);
        await State.deleteMany({}); // Optional: Clean the state collection first. Be careful, this deletes all existing data.
        await State.insertMany(states);
        console.log("States seeded successfully!");
    } catch (error) {
        console.error("Error seeding states:", error);
    }
};
