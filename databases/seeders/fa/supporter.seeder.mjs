import Supporter from "../../../app/models/supporter.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";
function translateSupporterNameToEnglish(farsiName) {
    const translationMap = {
        "دانشگاه آزاد گوهردشت": "Azad University of Gohardasht",
        "نیروی انتظامی": "Police Force",
        "دانشگاه فردوسی مشهد": "Ferdowsi University of Mashhad",
        "دانشگاه صنعتی اصفحان": "Isfahan University of Technology",
        // Add more translations as needed
    };

    return translationMap[farsiName] || farsiName; // Return the translated text or the original if not found
}
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
            logo: "public/uploads/supporters/hami2.png",
            supportType: "Financial",
            link: "www.example.com",
        },
        {
            name: "دانشگاه فردوسی مشهد",
            logo: "public/uploads/supporters/hami3.png",
            supportType: "Financial",
            link: "www.supporter.org",
        },
        {
            name: "دانشگاه صنعتی اصفحان",
            logo: "public/uploads/supporters/hami4.png",
            supportType: "Academic",
            link: "www.anothercompany.com",
        },
    ].map((supporter) => ({
        ...supporter,
        fa: {
            name: supporter.name,
        },
        en: {
            name: translateSupporterNameToEnglish(supporter.name),
        },
    }));

    try {
        await Supporter.deleteMany({});
        await Supporter.insertMany(supporters);
        // await insertDocumentsDynamically(Supporter, supporters);
        console.log("supporters added successfully");
    } catch (error) {
        console.error("error in supporters", error);
    }
};
