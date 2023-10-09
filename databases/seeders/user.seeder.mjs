import User from "../../app/models/user.model.mjs";
import bcrypt from "bcrypt";
import Role from "../../app/models/role.model.mjs";

export const seedUsers = async () => {
  const adminRole = await Role.findOne({ name: "admin" });
  console.log("Fetched Role:", adminRole);
  const users = [
    {
      username: "JohnDoe",
      password: await bcrypt.hash("Password123@", 10),
      email: "john@example.com",
      role: adminRole.name, // Use the role name directly
    },
    // Add more users as needed
  ];

  try {
    await User.insertMany(users);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
