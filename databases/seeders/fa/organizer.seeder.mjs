import Organizer from "../../../app/models/organizer.model.mjs";
import State from "../../../app/models/state.model.mjs";
import City from "../../../app/models/city.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedOrganizersFA = async () => {
    const state = await State.findOne({ state: "البرز" });
    const city = await City.findOne({ city: "کرج" });

    const organizers = [
        {
            name: "دانشگاه آزاد گوهردشت",
            logo: "public/uploads/supporters/hami1.jpg",
            link: "www.colizan.com",
            isMain: true,
            details: {
                address: {
                    state: state._id,
                    city: city._id,
                    address: "گوهردشت، خیابان موذن",
                    longitude: 123456,
                    latitude: 654321,
                },
                description:
                    "دانشگاه آزاد کرج یکی از بهترین دانشگاه های ایران با کسب بسیاری از جایزه ها و ... توانشته پا در عرصه علم جهانی گذاشته و متخصصات و مهندسان بزرگی تحویل جامعه ایران و جهان بدهد.",
                emails: ["mdrazamani@gmail.com", "mdracolizan@gmail.com"],
                phoneNumbers: ["۰۲۶۳۴۵۱۲۴۰۵", "۰۲۶۳۴۵۶۶۶۶۵"],
            },
        },
        {
            name: "دانشگاه فردوشی مشهد",
            logo: "public/uploads/supporters/hami3.png",
            link: "www.colizan.com",
            isMain: false,
            details: {
                address: {
                    state: state._id,
                    city: city._id,
                    address: "مهشد خیابان فردوسی، خیابان یاسینی",
                    longitude: 123456,
                    latitude: 654321,
                },
                description: "بزرگ و شناخته شده در تمام عالم زیر نظر فردوسی..",
                emails: ["mdrazamani@gmail.com", "mdracolizan@gmail.com"],
                phoneNumbers: ["۰۲۶۳۴۵۱۲۴۰۵", "۰۲۶۳۴۵۶۶۶۶۵"],
            },
        },
        {
            name: "نیروی انتظامی",
            logo: "public/uploads/supporters/hami2.png",
            link: "www.colizan.com",
            isMain: false,
            details: {
                address: {
                    state: state._id,
                    city: city._id,
                    address: "شهرک شاهین ویلا، بنیاد ۲۲ بهمن جنوبی",
                    longitude: 123456,
                    latitude: 654321,
                },
                description: "ماموریت انها حفاظت از بزرگ راه ها ...",
                emails: ["mdrazamani@gmail.com", "mdracolizan@gmail.com"],
                phoneNumbers: ["۰۲۶۳۴۵۱۲۴۰۵", "۰۲۶۳۴۵۶۶۶۶۵"],
            },
        },
        {
            name: "داشنگاه صنعتی اصفحان",
            logo: "public/uploads/supporters/hami4.png",
            link: "www.example.com",
            isMain: false,
            details: {
                address: {
                    state: state._id,
                    city: city._id,
                    address: "اصفحان نبش بلوار نقش جهان",
                    longitude: 789012,
                    latitude: 987654,
                },
                description: "چیزی برای گفتن نداریم ما فقط عمل می کنیم",
                emails: ["example@example.com", "info@example.com"],
                phoneNumbers: ["۰۲۶۳۴۵۱۲۳۴۵", "۰۲۶۳۴۵۶۷۸۹۰"],
            },
        },
    ];

    try {
        await Organizer.deleteMany({});
        // await Organizer.insertMany(organizers);
        await insertDocumentsDynamically(Organizer, organizers);
        console.log("سازمان‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن سازمان‌ها:", error);
    }
};
