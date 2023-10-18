import mongoose from "mongoose";
import dbconnection from "../../config/db.mjs";
import { seedStates } from "./state.seeder.mjs";
import { seedCity } from "./city.seeder.mjs";

import { seedUsers } from "./user.seeder.mjs";
import { seedRoles } from "./role.seeder.mjs";
import { seedSupporters } from "./supporter.seeder.mjs";
import { seedOrganizers } from "./organizer.seeder.mjs";
import { seedQuestions } from "./question.seeder.mjs";
import { seedHamayeshDetail } from "./hamayeshDetail.seeder.mjs";
import { seedAxie } from "./axie.seeder.mjs";
import { seedSecretariats } from "./secretariats.seeder.mjs";
import { seedSpeakers } from "./speakers.seeder.mjs";

const seedDatabase = async () => {
    try {
        dbconnection();
        await seedStates();
        await seedCity();
        await seedRoles();
        await seedUsers();
        await seedSecretariats();
        await seedSpeakers();
        await seedOrganizers();
        await seedSupporters();
        await seedQuestions();

        await seedAxie();

        await seedHamayeshDetail();

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
