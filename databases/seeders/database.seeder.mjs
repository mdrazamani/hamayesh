import mongoose from "mongoose";
import dbconnection from "../../config/db.mjs";
import { seedStates } from "./state.seeder.mjs";
import { seedCity } from "./city.seeder.mjs";

import { seedUsers } from "./user.seeder.mjs";
import { seedRoles } from "./role.seeder.mjs";
import { seedSupporters } from "./supporter.seeder.mjs";
import { seedOrganizers } from "./organizer.seeder.mjs";
import { seedQuestions } from "./question.seeder.mjs";

const seedDatabase = async () => {
    try {
        dbconnection();

        await seedRoles();
        await seedUsers();
        await seedStates();
        await seedCity();

        await seedOrganizers();
        await seedSupporters();

        await seedQuestions();

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
