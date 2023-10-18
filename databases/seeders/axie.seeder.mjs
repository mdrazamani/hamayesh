import Axie from "../../app/models/axie.model.mjs";

export const seedAxie = async () => {
    const parentAxies = [
        { title: "هوش مصنوعی", description: "هوش مصنوعی خیلی خوبه", level: 1 },
        { title: "بلاک چین", description: "بلاک چین خیلی خوبه", level: 1 },
        {
            title: "اینترنت اشیا",
            description: "اینترنت اشیا خیلی خوبه",
            level: 1,
        },
    ];

    try {
        const createdParentAxies = await Axie.insertMany(parentAxies);
        const parentIds = createdParentAxies.map((axie) => axie._id);

        const childAxies = [
            {
                title: "Axie #11",
                description: "Description for Axie #11",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "Axie #12",
                description: "Description for Axie #12",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "Axie #13",
                description: "Description for Axie #13",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "Axie #14",
                description: "Description for Axie #14",
                parent: parentIds[2],
                level: 2,
            },
        ];

        await Axie.insertMany(childAxies);
        console.log("Axie seeded successfully!");
    } catch (error) {
        console.error("Error seeding Axie:", error);
    }
};
