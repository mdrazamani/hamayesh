import Organizer from "../../app/models/organizer.model.mjs";
import State from "../../app/models/state.model.mjs";
import City from "../../app/models/city.model.mjs";

export const seedOrganizers = async () => {
    const state = await State.findOne({ state: "البرز" });
    const city = await City.findOne({ city: "کرج" });

    const organizers = [
        {
            name: "Colizan",
            logo: "test",
            link: "www.colizan.com",
            isMain: true,
            details: {
                address: {
                    state: state._id,
                    city: city._id,
                    address: "shahin vila bonyad 22 bahman jonobi",
                    longitude: 123456,
                    latitude: 654321,
                },
                description: "a big compnay in It",
                emails: ["mdrazamani@gmail.com", "mdracolizan@gmail.com"],
                phoneNumbers: ["02634512405", "02634566665"],
            },
        },
    ];

    try {
        await Organizer.deleteMany({});
        await Organizer.insertMany(organizers);
        console.log("Organizer seeded successfully!");
    } catch (error) {
        console.error("Error seeding Organizer:", error);
    }
};
