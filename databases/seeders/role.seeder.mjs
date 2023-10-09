import Role from "../../app/models/role.model.mjs";
import Permission from "../../app/models/permission.model.mjs";

export const seedRoles = async () => {
  const adminPermission = await Permission.findOne({ name: "admin" });
  const userPermission = await Permission.findOne({ name: "user" });

  const roles = [
    {
      name: "admin",
      permissions: [adminPermission._id, userPermission._id],
    },
    {
      name: "user",
      permissions: [userPermission._id],
    },
  ];

  try {
    await Role.insertMany(roles);
    console.log("Roles seeded successfully!");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};
