import User from "../../app/models/user.model.mjs";
import bcrypt from "bcrypt";
import Role from "../../app/models/role.model.mjs";
import State from "../../app/models/state.model.mjs";
import City from "../../app/models/city.model.mjs";

export const seedUsers = async () => {
    // First, find the 'user' and 'admin' roles in the database to use their IDs.
    const adminRole = await Role.findOne({ name: "admin" });
    const userRole = await Role.findOne({ name: "user" });

    const state = await State.findOne({ state: "البرز" });
    const city = await City.findOne({ city: "کرج" });
    // If these roles are not found, you may need to seed them first or check your roles' seeder.

    // Define the users you want to seed into the database.
    // Including the new fields you added to your model.
    const users = [
        {
            firstName: "Mohammadreza",
            lastName: "Zamani",
            phoneNumber: "09108494221",
            password: await bcrypt.hash("Password123@", 10),
            email: "mohsen.rezvani.rad33@gmail.com", // changed to avoid confusion with 'john@example.com'
            emailVerifiedAt: null, // or new Date() if the email is considered verified
            role: {
                id: adminRole._id,
                name: adminRole.name, // Admin role name from the fetched role
            },
            profileImage: null, // or provide a path to a default image
            lastLoginAt: null, // can be updated to current time if needed
            national_id: "0012345678", // should be a valid Iranian national ID
            gender: "male", // or other appropriate value
            study_field: "Computer Science",
            degree: "Master's",
            institute: "Institute of Technology",
            country: "Iran",
            state: state._id,
            city: city._id,
            deletedAt: null, // Assuming the user is active
        },

        {
            firstName: "mohsen",
            lastName: "rezvani",
            phoneNumber: "09330111568",
            password: await bcrypt.hash("Password123@", 10),
            email: "rezvani@example.com", // changed to avoid confusion with 'john@example.com'
            emailVerifiedAt: null, // or new Date() if the email is considered verified
            role: {
                id: userRole._id,
                name: userRole.name, // Admin role name from the fetched role
            },
            profileImage: null, // or provide a path to a default image
            lastLoginAt: null, // can be updated to current time if needed
            national_id: "0012345679", // should be a valid Iranian national ID
            gender: "male", // or other appropriate value
            study_field: "Computer Science",
            degree: "Master's",
            institute: "Institute of Technology",
            country: "Iran",
            state: state._id,
            city: city._id,
            deletedAt: null, // Assuming the user is active
        },
        // ... other users
    ];

    // Insert users into the database.
    try {
        await User.deleteMany({}); // Optional: Clean the user collection first. Be careful, as this deletes all existing data.
        await User.insertMany(users);
        console.log("Users seeded successfully!");
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};
