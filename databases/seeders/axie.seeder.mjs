import Axie from "../../app/models/axie.model.mjs";

export const seedAxie = async () => {
    const parentAxies = [
        {
            title: "Artificial Intelligence",
            description: "Artificial Intelligence is fascinating.",
            level: 1,
        },
        {
            title: "Blockchain",
            description: "Blockchain technology is revolutionary.",
            level: 1,
        },
        {
            title: "Internet of Things",
            description: "The Internet of Things is shaping the future.",
            level: 1,
        },
    ];

    try {
        await Axie.deleteMany({});
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
            {
                title: "Axie #15",
                description: "Description for Axie #15",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "Axie #16",
                description: "Description for Axie #16",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "Axie #17",
                description: "Description for Axie #17",
                parent: parentIds[2],
                level: 2,
            },
            {
                title: "Axie #18",
                description: "Description for Axie #18",
                parent: parentIds[0],
                level: 2,
            },
            {
                title: "Axie #19",
                description: "Description for Axie #19",
                parent: parentIds[1],
                level: 2,
            },
            {
                title: "Axie #20",
                description: "Description for Axie #20",
                parent: parentIds[1],
                level: 2,
            },
        ];

        await Axie.insertMany(childAxies);
        console.log("Axie seeded successfully!");
    } catch (error) {
        console.error("Error seeding Axie:", error);
    }
};
