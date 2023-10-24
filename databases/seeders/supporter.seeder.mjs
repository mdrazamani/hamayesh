import Supporter from "../../app/models/supporter.model.mjs";

export const seedSupporters = async () => {
    const supporters = [
        {
            name: "Colizan Company",
            logo: "test",
            supportType: "Academic",
            link: "www.colizan.com",
        },
        {
            name: "Example Company",
            logo: "test",
            supportType: "Academic",
            link: "www.example.com",
        },
        {
            name: "Supporter Organization",
            logo: "test",
            supportType: "Financial",
            link: "www.supporter.org",
        },
        {
            name: "Another Company",
            logo: "test",
            supportType: "Financial",
            link: "www.anothercompany.com",
        },
        // ... Add more sample supporters
    ];

    try {
        await Supporter.deleteMany({});
        await Supporter.insertMany(supporters);
        console.log("Supporters seeded successfully!");
    } catch (error) {
        console.error("Error seeding supporters:", error);
    }
};
