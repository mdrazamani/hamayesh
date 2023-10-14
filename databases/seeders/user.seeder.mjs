import User from "../../app/models/user.model.mjs";
import bcrypt from "bcrypt";
import Role from "../../app/models/role.model.mjs";

export const seedUsers = async () => {
    const adminRole = await Role.findOne({ name: "admin" });
    console.log("Fetched Role:", adminRole);
    const users = [
        {
            fisrtName: "mohammadreza",
            lastName: "zamani",
            phoneNumber: "+989035631126",
            password: await bcrypt.hash("Password123@", 10),
            email: "john@example.com",
            emailVerifiedAt: null,
            role: {
                id: adminRole._id,
                name: adminRole.name,
            }, // Store both ObjectId and name
            profileImage: null,
            lastLoginAt: null,
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
