import Supporter from "../../../app/models/supporter.model.mjs";

export const seedSupportersFA = async () => {
    const supporters = [
        {
            name: "دانشگاه آزاد گوهردشت",
            logo: "public/uploads/supporters/hami1.jpg",
            supportType: "Financial",
            link: "www.colizan.com",
        },
        {
            name: "نیروی انتظامی",
            logo: "public\\uploads\\supporters\\hami2.png",
            supportType: "Financial",
            link: "www.example.com",
        },
        {
            name: "دانشگاه فردوسی مشهد",
            logo: "public\\uploads\\supporters\\hami3.png",
            supportType: "Financial",
            link: "www.supporter.org",
        },
        {
            name: "دانشگاه صنعتی اصفحان",
            logo: "public\\uploads\\supporters\\hami4.png",
            supportType: "Academic",
            link: "www.anothercompany.com",
        },
    ];

    try {
        await Supporter.deleteMany({});
        await Supporter.insertMany(supporters);
        console.log("supporters added successfully");
    } catch (error) {
        console.error("error in supporters", error);
    }
};
