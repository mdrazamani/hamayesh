import HamayeshDetail from "../../app/models/hamayeshDetail.model.mjs";
import State from "../../app/models/state.model.mjs";
import City from "../../app/models/city.model.mjs";

export const seedHamayeshDetail = async () => {
    const state = await State.findOne({ state: "البرز" });
    const city = await City.findOne({ city: "کرج" });

    const detail = [
        {
            faTitle: "نهمین همایش بین المللی نفت و گاز",
            enTitle: "the nine international conferance",
            description: "یک همایش فوق العاده",
            iscCode: "123659845",
            aboutHtml: "<div><h1>این یه همایش معمولی نیست!</h1></div>",
            poster: "test/test",
            eventAddress: {
                state: state._id,
                city: city._id,
                address: "shahin vila bonyad 22 bahman jonobi",
                longitude: 123456,
                latitude: 654321,
            },
        },
    ];

    try {
        await HamayeshDetail.insertMany(detail);
        console.log("HamayeshDetail seeded successfully!");
    } catch (error) {
        console.error("Error seeding HamayeshDetail:", error);
    }
};
