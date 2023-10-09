import mongoose from "mongoose";
import { seedUsers } from "./user.seeder.mjs";
import { seedRoles } from "./role.seeder.mjs";
import { seedPermissions } from "./permission.seeder.mjs";
import dbconnection from "../../config/db.mjs";

const seedDatabase = async () => {
  try {
    dbconnection();

    await seedPermissions();
    await seedRoles();
    await seedUsers();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
