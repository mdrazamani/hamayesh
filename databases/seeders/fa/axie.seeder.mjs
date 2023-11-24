import Axie from "../../../app/models/axie.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";
// Assuming translationMap is already defined with Farsi to English mappings
const translationMap = {
    // Titles
    "هوش مصنوعی": "Artificial Intelligence",
    "بلاک‌ چین": "Blockchain",
    "اینترنت اشیا": "Internet of Things",
    "محور #11": "Axis #11",
    "محور #12": "Axis #12",
    "محور #13": "Axis #13",
    "محور #14": "Axis #14",
    "محور #15": "Axis #15",
    "محور #16": "Axis #16",
    "محور #17": "Axis #17",
    "محور #18": "Axis #18",
    "محور #19": "Axis #19",
    "محور #20": "Axis #20",
    "زیرمحور #1": "Subaxis #1",
    "زیرمحور #2": "Subaxis #2",

    // Descriptions
    "هوش مصنوعی واقعاً جذاب است.":
        "Artificial Intelligence is really fascinating.",
    "تکنولوژی بلاک‌چین واقعاً انقلابی است.":
        "Blockchain technology is truly revolutionary.",
    "اینترنت اشیا در حال شکل دادن آینده است.":
        "The Internet of Things is shaping the future.",
    "توضیحات برای محور #11": "Description for Axis #11",
    "توضیحات برای محور #12": "Description for Axis #12",
    "توضیحات برای محور #13": "Description for Axis #13",
    "توضیحات برای محور #14": "Description for Axis #14",
    "توضیحات برای محور #15": "Description for Axis #15",
    "توضیحات برای محور #16": "Description for Axis #16",
    "توضیحات برای محور #17": "Description for Axis #17",
    "توضیحات برای محور #18": "Description for Axis #18",
    "توضیحات برای محور #19": "Description for Axis #19",
    "توضیحات برای محور #20": "Description for Axis #20",
    "توضیحات برای زیرمحور #1": "Description for Subaxis #1",
    "توضیحات برای زیرمحور #2": "Description for Subaxis #2",
    // ... add more translations as needed
};

function translateToEnglish(farsiText) {
    return translationMap[farsiText] || farsiText;
}

export const seedAxieFA = async () => {
    const parentAxies = [
        {
            title: "هوش مصنوعی",
            description: "هوش مصنوعی واقعاً جذاب است.",
            level: 1,
        },
        {
            title: "بلاک‌ چین",
            description: "تکنولوژی بلاک‌چین واقعاً انقلابی است.",
            level: 1,
        },
        {
            title: "اینترنت اشیا",
            description: "اینترنت اشیا در حال شکل دادن آینده است.",
            level: 1,
        },
    ].map((item) => {
        return {
            ...item,
            fa: {
                title: item.title,
                description: item.description,
            },
            en: {
                title: translateToEnglish(item.title),
                description: translateToEnglish(item.description),
            },
        };
    });

    try {
        await Axie.deleteMany({});
        // const createdParentAxies = await Axie.insertMany(parentAxies);
        const createdParentAxies = await insertDocumentsDynamically(
            Axie,
            parentAxies
        );
        const parentIds = createdParentAxies.map((axie) => axie._id);

        const childAxies = [
            {
                title: "محور #11",
                description: "توضیحات برای محور #11",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "محور #12",
                description: "توضیحات برای محور #12",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "محور #13",
                description: "توضیحات برای محور #13",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "محور #14",
                description: "توضیحات برای محور #14",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "محور #15",
                description: "توضیحات برای محور #15",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "محور #16",
                description: "توضیحات برای محور #16",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "محور #17",
                description: "توضیحات برای محور #17",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "محور #18",
                description: "توضیحات برای محور #18",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "محور #19",
                description: "توضیحات برای محور #19",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "محور #20",
                description: "توضیحات برای محور #20",
                parent: parentIds[1],
                level: 2,
            },
        ].map((item) => {
            return {
                ...item,
                fa: {
                    title: item.title,
                    description: item.description,
                },
                en: {
                    title: translateToEnglish(item.title),
                    description: translateToEnglish(item.description),
                },
            };
        });

        // const createdChildAxies = await Axie.insertMany(childAxies);
        const createdChildAxies = await insertDocumentsDynamically(
            Axie,
            childAxies
        );
        const childIds = createdChildAxies.map((axie) => axie._id);

        const grandChildAxies = [
            {
                title: "زیرمحور #1",
                description: "توضیحات برای زیرمحور #1",
                parent: childIds[0],
                level: 3,
            },
            {
                title: "زیرمحور #2",
                description: "توضیحات برای زیرمحور #2",
                parent: childIds[1],
                level: 3,
            },
        ].map((item) => {
            return {
                ...item,
                fa: {
                    title: item.title,
                    description: item.description,
                },
                en: {
                    title: translateToEnglish(item.title),
                    description: translateToEnglish(item.description),
                },
            };
        });

        await Axie.insertMany(grandChildAxies);
        // await insertDocumentsDynamically(Axie, grandChildAxies);
        console.log("محور‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن محور:", error);
    }
};
