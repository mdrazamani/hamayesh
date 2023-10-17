import Organizer from "../../app/models/organizer.model.mjs";

export const seedOrganizers = async () => {
    const organizers = [
        {
            name: "Colizan",
            logo: "test",
            link: "www.colizan.com",
            isMain: true,
        },
    ];

    try {
        await Organizer.insertMany(organizers);
        console.log("Organizer seeded successfully!");
    } catch (error) {
        console.error("Error seeding Organizer:", error);
    }
};
