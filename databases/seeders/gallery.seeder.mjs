import Gallery from "../../app/models/gallery.model.mjs"; // Adjust the import as per your file structure
import { insertDocumentsDynamically } from "../../config/modelChanger.mjs";
const translationMap = {
    // Category Translations
    "Category 0": "دسته 0",
    "Category 1": "دسته 1",
    // ... add more translations as needed

    // Description Translations
    "Description for Category 0": "توضیحات برای دسته 0",
    "Description for Category 1": "توضیحات برای دسته 1",
    // ... add more translations as needed
};

function translateToFarsi(englishText) {
    return translationMap[englishText] || englishText;
}
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
        const category = `Category ${i}`;
        const description = `Description for Category ${i}`;
        const gallery = {
            fa: {
                category: translateToFarsi(category),
                description: translateToFarsi(description),
            },
            en: {
                category,
                description,
            },
            slug: `category-${i}-gallery`,
            images: [],
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
        await Gallery.insertMany(galleries);
        // await insertDocumentsDynamically(Gallery, galleries);
        console.log("Galleries seeded successfully!");
    } catch (error) {
        console.error("Error seeding galleries:", error);
    }
};
