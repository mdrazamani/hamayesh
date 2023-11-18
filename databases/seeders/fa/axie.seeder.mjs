import Axie from "../../../app/models/axie.model.mjs";
import { insertDocumentsDynamically } from "../../../config/modelChanger.mjs";

export const seedAxieFA = async () => {
    const parentAxies = [
        {
            title: "هوش مصنوعی",
            description: "هوش مصنوعی واقعاً جذاب است.",
            level: 1,
        },
        {
            title: "بلاک‌چین",
            description: "تکنولوژی بلاک‌چین واقعاً انقلابی است.",
            level: 1,
        },
        {
            title: "اینترنت اشیا",
            description: "اینترنت اشیا در حال شکل دادن آینده است.",
            level: 1,
        },
    ];

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
        ];

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
        ];

        // await Axie.insertMany(grandChildAxies);
        await insertDocumentsDynamically(Axie, grandChildAxies);
        console.log("محور‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن محور:", error);
    }
};
