import mongoose from "mongoose";
import { seedUsers } from "./user.seeder.mjs";
import { seedRoles } from "./role.seeder.mjs";
import dbconnection from "../../config/db.mjs";
import { seedStates } from "./state.seeder.mjs";
import { seedCity } from "./city.seeder.mjs";

const seedDatabase = async () => {
    try {
        dbconnection();

        await seedRoles();
        await seedUsers();
        await seedStates();
        await seedCity();

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
