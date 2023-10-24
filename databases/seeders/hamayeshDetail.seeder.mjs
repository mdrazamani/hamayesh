import HamayeshDetail from "../../app/models/hamayeshDetail.model.mjs";
import State from "../../app/models/state.model.mjs";
import City from "../../app/models/city.model.mjs";

export const seedHamayeshDetail = async () => {
    try {
        const state = await State.findOne({ state: "البرز" });
        const city = await City.findOne({ city: "کرج" });

        if (!state || !city) {
            throw new Error("State or city not found.");
        }

        const hamayeshDetails = [
            {
                faTitle: "The Ninth International Conference on Oil and Gas",
                enTitle: "The Ninth International Conference on Oil and Gas",
                description: "An extraordinary conference on oil and gas",
                iscCode: "123659845",
                aboutHtml:
                    "<div><h1>This is no ordinary conference!</h1></div>",
                poster: "path/to/poster",
                headerImage: "path/to/poster",
                eventAddress: {
                    state: state._id,
                    city: city._id,
                    address: "Shahin Vila, Bonyad 22 Bahman Jonobi",
                    longitude: 123456,
                    latitude: 654321,
                },
                writingArticles: {
                    description: "Guidelines for writing articles",
                    files: [],
                },
                dates: {
                    start: new Date(),
                    end: new Date(),
                },
            },
        ];

        await HamayeshDetail.deleteMany({});
        await HamayeshDetail.insertMany(hamayeshDetails);

        console.log("HamayeshDetail seeded successfully!");
    } catch (error) {
        console.error("Error seeding HamayeshDetail:", error);
    }
};
