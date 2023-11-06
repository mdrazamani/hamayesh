import Slider from "../../../app/models/silder.model.mjs";

export const seedSlidersFA = async () => {
    const sliders = [
        {
            title: "نهمین همایش بین المللی نفت و گاز",
            description:
                "به روز ترین تجهیزات هوش مصنوعی با حضور برترین شکرت ها",
            image: "public\\uploads\\sliders\\slider1.png",
            link: "",
            isActive: true,
            order: 1,
        },
        {
            title: "بینایی ماشین",
            description: "توسعه و تاسیس بیش از 19 مرکز اموزش بینایی ماشین",
            image: "public\\uploads\\sliders\\slider5.png",
            link: "www.example.com",
            isActive: true,
            order: 2,
        },
        {
            title: "بلاک چین",
            description: "ایجاد بیش از 7 ارزدیجیتال جدید ملی",
            image: "public\\uploads\\sliders\\slider2.png",
            link: "www.supporter.org",
            isActive: false,
            order: 3,
        },
        {
            title: "همنشینی و مشارکت با 36 شکرت فعال در حوضه آیتی",
            description:
                "قرار داد نویسی در محل با حضور فرماندار محترم استان البرز",
            image: "public\\uploads\\sliders\\slider7.jpg",
            link: "www.anothercompany.com",
            isActive: true,
            order: 4,
        },
    ];

    try {
        await Slider.deleteMany({});
        await Slider.insertMany(sliders);
        console.log("Sliders added successfully");
    } catch (error) {
        console.error("Error in adding sliders", error);
    }
};
