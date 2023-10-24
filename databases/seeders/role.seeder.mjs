import Role from "../../app/models/role.model.mjs";

export const seedRoles = async () => {
    const roles = [
        {
            name: "admin",
            faName: "ادمین",
        },
        {
            name: "user",
            faName: "کاربر",
        },
        {
            name: "executive",
            faName: "کاربر اجرایی",
        },
        {
            name: "scientific",
            faName: "کاربر علمی",
        },
        {
            name: "referee",
            faName: "داور",
        },
    ];

    try {
        await Role.deleteMany({});
        await Role.insertMany(roles);
        console.log("Roles seeded successfully!");
    } catch (error) {
        console.error("Error seeding roles:", error);
    }
};
