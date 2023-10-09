import mongoose from "mongoose";
import { seedUsers } from "./user.seeder.mjs";
import dbconnection from "../../config/db.mjs";
// Import other seeders as needed

const seedDatabase = async () => {
    try {
        dbconnection();

        // Run individual seeders
        await seedUsers();
        // Add other seeders here

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
