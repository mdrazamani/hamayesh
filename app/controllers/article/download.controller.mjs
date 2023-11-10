import archiver from "archiver";

import Article from "../../models/article.model.mjs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to create a ZIP file
const createZip = async (files, res) => {
    const archive = archiver("zip", {
        zlib: { level: 9 }, // Set compression level
    });

    // Pipe the ZIP file to the response object
    archive.pipe(res);

    // Add files to the ZIP
    files.forEach((file) => {
        const filePath = path.join(__dirname, "..", file);
        archive.file(filePath, { name: path.basename(filePath) });
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
        const allFiles = [
            ...article.articleFiles,
            ...article.presentationFiles,
        ];

        if (allFiles.length === 0) {
            return res.status(404).json({ message: "No files found" });
        }

        // Set the response headers for downloading a ZIP file
        res.setHeader("Content-Type", "application/zip");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=articleFiles.zip`
        );

        createZip(allFiles, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
