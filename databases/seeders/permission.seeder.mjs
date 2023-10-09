import Permission from "../../app/models/permission.model.mjs";

export const seedPermissions = async () => {
  const permissions = [
    {
      name: "admin",
      description: "admin",
    },
    {
      name: "user",
      description: "user",
    },
  ];

  try {
    await Permission.insertMany(permissions);
    console.log("Permission seeded successfully!");
  } catch (error) {
    console.error("Error seeding Permission:", error);
  }
};
