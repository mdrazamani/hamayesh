import Axie from "../../../app/models/axie.model.mjs";

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
        const createdParentAxies = await Axie.insertMany(parentAxies);
        const parentIds = createdParentAxies.map((axie) => axie._id);

        const childAxies = [
            {
                title: "آکسی #11",
                description: "توضیحات برای آکسی #11",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "آکسی #12",
                description: "توضیحات برای آکسی #12",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "آکسی #13",
                description: "توضیحات برای آکسی #13",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "آکسی #14",
                description: "توضیحات برای آکسی #14",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "آکسی #15",
                description: "توضیحات برای آکسی #15",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "آکسی #16",
                description: "توضیحات برای آکسی #16",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "آکسی #17",
                description: "توضیحات برای آکسی #17",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "آکسی #18",
                description: "توضیحات برای آکسی #18",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "آکسی #19",
                description: "توضیحات برای آکسی #19",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "آکسی #20",
                description: "توضیحات برای آکسی #20",
                parent: parentIds[1],
                level: 2,
            },
        ];

        await Axie.insertMany(childAxies);
        console.log("آکسی‌ها با موفقیت seed شدند!");
    } catch (error) {
        console.error("خطا در seed کردن آکسی:", error);
    }
};
