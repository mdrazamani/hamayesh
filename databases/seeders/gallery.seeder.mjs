import Gallery from "../../app/models/gallery.model.mjs"; // Adjust the import as per your file structure

export const seedGalleries = async () => {
    // Predefined list of galleries to add to the database
    const galleries = [
        {
            category: "Nature",
            slug: "nature-gallery",
            images: [
                {
                    path: "/path/to/nature1.jpg", // This should be the path where your image is stored
                    title: "Beautiful Landscape",
                },
                // ... more images
            ],
            description: "A collection of beautiful nature landscapes",
            isActive: true,
        },
        {
            category: "Architecture",
            slug: "architecture-gallery",
            images: [
                {
                    path: "/path/to/architecture1.jpg",
                    title: "Modern Building",
                },
                // ... more images
            ],
            description: "Stunning modern architecture from around the world",
            isActive: true,
        },
        // ... more gallery objects
    ];

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
