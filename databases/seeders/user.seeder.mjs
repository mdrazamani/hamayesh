import User from "../../app/models/user.model.mjs";
import bcrypt from "bcrypt";
export const seedUsers = async () => {
  const user = [
    {
      username: "JohnDoe",
      password: await bcrypt.hash("Password123@", 10),
      email: "john@example.com",
      role: "admin",
    },
    // Add more users as needed
  ];

  try {
    await User.insertMany(user);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
