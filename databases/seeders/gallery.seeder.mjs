import Gallery from "../../app/models/gallery.model.mjs"; // Adjust the import as per your file structure

export const seedGalleries = async () => {
    const numberOfGalleries = 100; // Adjust as needed
    const numberOfImagesPerGallery = 50; // Adjust as needed

    // Generate galleries
    const galleries = [];
    for (let i = 0; i < numberOfGalleries; i++) {
        const gallery = {
            category: `Category ${i}`,
            slug: `category-${i}-gallery`,
            images: [],
            description: `Description for Category ${i}`,
            isActive: true,
        };

        for (let j = 0; j < numberOfImagesPerGallery; j++) {
            gallery.images.push({
                path: `public/uploads/headerImage/test.png`,
                title: `Title for image ${j} in category ${i}`,
            });
        }

        galleries.push(gallery);
    }

    try {
        // Clear the existing galleries (Be careful with this in a production environment)
        await Gallery.deleteMany({});
        // Insert the new galleries
        await Gallery.insertMany(galleries);
        console.log("Galleries seeded successfully!");
    } catch (error) {
        console.error("Error seeding galleries:", error);
    }
};
