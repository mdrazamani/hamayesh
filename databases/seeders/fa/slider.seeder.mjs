import Slider from "../../../app/models/silder.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";
const translationMap = {
    // Farsi to English Title Translations
    "نهمین همایش بین المللی هوش مصنوعی و بلاک چین":
        "9th International Conference on Artificial Intelligence and Blockchain",
    "بینایی ماشین": "Machine Vision",
    "همنشینی و مشارکت با 36 شکرت فعال در حوضه آیتی":
        "Collaboration with 36 Active IT Companies",
    "بلاک چین": "Blockchain",

    // Farsi to English Description Translations
    "به روز ترین تجهیزات هوش مصنوعی با حضور برترین شکرت ها":
        "State-of-the-art artificial intelligence equipment with the presence of leading companies",
    "توسعه و تاسیس بیش از 19 مرکز اموزش بینایی ماشین":
        "Development and establishment of more than 19 machine vision training centers",
    "قرار داد نویسی در محل با حضور فرماندار محترم استان البرز":
        "On-site contract writing with the presence of the honorable governor of Alborz Province",
    "ایجاد بیش از 7 ارزدیجیتال جدید ملی":
        "Creation of more than 7 new national digital currencies",
    // ... add more translations as needed
};
function translateToEnglish(farsiText) {
    return translationMap[farsiText] || farsiText;
}
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
    ].map((slider) => ({
        fa: {
            title: slider.title,
            description: slider.description,
        },
        en: {
            title: translateToEnglish(slider.title),
            description: translateToEnglish(slider.description),
        },
        image: slider.image,
        link: slider.link,
        isActive: slider.isActive,
        order: slider.order,
    }));

    try {
        await Slider.deleteMany({});
        await Slider.insertMany(sliders);
        // await insertDocumentsDynamically(Slider, sliders);
        console.log("Sliders added successfully");
    } catch (error) {
        console.error("Error in adding sliders", error);
    }
};
