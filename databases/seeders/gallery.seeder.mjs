import Gallery from "../../app/models/gallery.model.mjs"; // Adjust the import as per your file structure
import { insertDocumentsDynamically } from "../../config/modelChanger.mjs";

export const seedGalleries = async () => {
    const numberOfGalleries = 2; // Adjust as needed

    const images = [
        "public/uploads/galleries/gallery1.jpg",
        "public/uploads/galleries/gallery2.jpg",
        "public/uploads/galleries/gallery3.jpg",
        "public/uploads/galleries/gallery4.jpg",
        "public/uploads/galleries/gallery5.jpg",
        "public/uploads/galleries/gallery6.jpg",
        "public/uploads/galleries/gallery7.jpg",
        "public/uploads/galleries/gallery8.jpg",
        "public/uploads/galleries/gallery9.jpg",
        "public/uploads/galleries/gallery10.jpg",
        "public/uploads/galleries/gallery11.jpg",
        "public/uploads/galleries/gallery12.jpg",
        "public/uploads/galleries/gallery13.jpg",
        "public/uploads/galleries/gallery14.jpg",
    ];

    // Generate galleries
    const galleries = [];
    let k = 0;
    for (let i = 0; i < numberOfGalleries; i++) {
        const gallery = {
            category: `Category ${i}`,
            slug: `category-${i}-gallery`,
            images: [],
            description: `Description for Category ${i}`,
            isActive: true,
        };

        for (let j = 0; j < (i == 0 ? 9 : 5); j++) {
            gallery.images.push({
                path: images[k++],
                title: `Title for image ${j} in category ${i}`,
            });
        }

        galleries.push(gallery);
    }

    try {
        // Clear the existing galleries (Be careful with this in a production environment)
        await Gallery.deleteMany({});
        // Insert the new galleries
        // await Gallery.insertMany(galleries);
        await insertDocumentsDynamically(Gallery, galleries);
        console.log("Galleries seeded successfully!");
    } catch (error) {
        console.error("Error seeding galleries:", error);
    }
};
