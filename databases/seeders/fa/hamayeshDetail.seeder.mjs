import HamayeshDetail from "../../../app/models/hamayeshDetail.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";

export const seedHamayeshDetailFA = async () => {
    try {
        const state = await State.findOne({ state: "البرز" });
        const city = await City.findOne({ city: "کرج" });

        if (!state || !city) {
            throw new Error("استان یا شهر مورد نظر یافت نشد.");
        }

        const hamayeshDetails = [
            {
                faTitle: "نهمین همایش بین المللی نفت و گاز",
                enTitle: "The Ninth International Conference on Oil and Gas",
                description: "یک همایش فوق العاده در زمینه نفت و گاز",
                iscCode: "123659845",
                aboutHtml: "<div><h1>این یه همایش معمولی نیست!</h1></div>",
                poster: "path/to/poster",
                headerImage: "public/uploads/headerImage/test.png",
                eventAddress: {
                    state: state._id,
                    city: city._id,
                    address: "شاهین ویلا، بنیاد 22 بهمن جنوبی",
                    longitude: 123456,
                    latitude: 654321,
                },
                writingArticles: {
                    description: "دستورالعمل برای نوشتن مقالات",
                    files: [],
                },
                dates: {
                    start: new Date(+new Date() + 10368000000),
                    end: new Date(+new Date() + 10398000000),
                },
            },
        ];

        await HamayeshDetail.deleteMany({});
        await HamayeshDetail.insertMany(hamayeshDetails);

        console.log("HamayeshDetail seeded successfully!");
    } catch (error) {
        console.error("خطا در seed کردن HamayeshDetail:", error);
    }
};
