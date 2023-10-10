import Role from "../../app/models/role.model.mjs";

export const seedRoles = async () => {
  const roles = [
    {
      name: "admin",
      permissions: ["create", "update", "read", "delete"],
    },
    {
      name: "user",
      permissions: ["read"],
    },
  ];

  try {
    await Role.insertMany(roles);
    console.log("Roles seeded successfully!");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};
