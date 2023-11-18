import Slider from "../../../app/models/silder.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedSlidersFA = async () => {
    const sliders = [
        {
            title: "نهمین همایش بین المللی هوش مصنوعی و بلاک چین",
            description:
                "به روز ترین تجهیزات هوش مصنوعی با حضور برترین شکرت ها",
            image: "public/uploads/slider/sdasd.jpg",
            link: "",
            isActive: true,
            order: 1,
        },
        {
            title: "بینایی ماشین",
            description: "توسعه و تاسیس بیش از 19 مرکز اموزش بینایی ماشین",
            image: "public/uploads/slider/joanna-kosinska-1_CMoFsPfso-unsplash.jpg",
            link: "www.example.com",
            isActive: true,
            order: 2,
        },

        {
            title: "همنشینی و مشارکت با 36 شکرت فعال در حوضه آیتی",
            description:
                "قرار داد نویسی در محل با حضور فرماندار محترم استان البرز",
            image: "public/uploads/slider/mohamed-nohassi-YvoedPdh9JM-unsplash.jpg",
            link: "www.anothercompany.com",
            isActive: true,
            order: 4,
        },
        {
            title: "بلاک چین",
            description: "ایجاد بیش از 7 ارزدیجیتال جدید ملی",
            image: "public/uploads/slider/jr-korpa-9XngoIpxcEo-unsplash.jpg",
            link: "www.supporter.org",
            isActive: false,
            order: 3,
        },
    ];

    try {
        await Slider.deleteMany({});
        // await Slider.insertMany(sliders);
        await insertDocumentsDynamically(Slider, sliders);
        console.log("Sliders added successfully");
    } catch (error) {
        console.error("Error in adding sliders", error);
    }
};
