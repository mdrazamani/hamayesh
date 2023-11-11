import archiver from "archiver";

import Article from "../../models/article.model.mjs";
import path from "path";

// Function to create a ZIP file
const createZip = async (articleFiles, presentationFiles, res) => {
    const archive = archiver("zip", {
        zlib: { level: 9 }, // Set compression level
    });

    // Pipe the ZIP file to the response object
    archive.pipe(res);

    // Add article files to the ZIP in the 'article' folder
    articleFiles.forEach((file) => {
        const filePath = path.join("article", path.basename(file));
        archive.file(file, { name: filePath });
    });

    // Add presentation files to the ZIP in the 'presentation' folder
    presentationFiles.forEach((file) => {
        const filePath = path.join("presentation", path.basename(file));
        archive.file(file, { name: filePath });
    });

    // Finalize the ZIP and send it
    archive.finalize();
};

export const downloadController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        // Combine articleFiles and presentationFiles into one array
        // const allFiles = [
        //     ...article.articleFiles,
        //     ...article.presentationFiles,
        // ];

        // if (allFiles.length === 0) {
        //     return res.status(404).json({ message: "No files found" });
        // }

        // Set the response headers for downloading a ZIP file
        res.setHeader("Content-Type", "application/zip");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=articleFiles.zip`
        );

        await createZip(article.articleFiles, article.presentationFiles, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
