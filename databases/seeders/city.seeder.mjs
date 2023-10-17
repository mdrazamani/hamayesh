import City from "../../app/models/city.model.mjs";
import State from "../../app/models/state.model.mjs"; // Import your State model
import { createPath } from "../../config/tools.mjs";
import fs from "fs";

// Function to seed states
export const seedCity = async () => {
    // Define the states data. This would be imported or read from your 'states.json' file
    // For the purpose of this example, I'll use a placeholder for the states array.

    const cityPath = createPath(
        "../../public/dev-data/cities.json",
        import.meta.url
    );

    // Insert states into the database.
    try {
        const data = fs.readFileSync(cityPath, "utf-8");
        const cities = JSON.parse(data);
        await City.deleteMany({}); // Optional: Clean the state collection first. Be careful, this deletes all existing data.
        await City.insertMany(cities);
        console.log("Cities seeded successfully!");
    } catch (error) {
        console.error("Error seeding states:", error);
    }
};
