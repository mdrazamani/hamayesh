import Supporter from "../../app/models/supporter.model.mjs";

export const seedSupporters = async () => {
    const supporters = [
        {
            name: "Colizan",
            logo: "test",
            supportType: "Financial",
            link: "www.colizan.com",
        },
    ];

    try {
        await Supporter.insertMany(supporters);
        console.log("supporters seeded successfully!");
    } catch (error) {
        console.error("Error seeding supporters:", error);
    }
};
