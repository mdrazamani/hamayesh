import archiver from "archiver";
import JudgingArticle from "../../../models/JudgingArticles.model.mjs";

// import Article from "../../models/article.model.mjs";
import path from "path";
import User from "../../../models/user.model.mjs";
import APIError from "../../../../utils/errors.mjs";
import { getMessage } from "../../../../config/i18nConfig.mjs";

// Function to create a ZIP file
// Function to encode non-ASCII characters for Content-Disposition header
function encodeRFC5987ValueChars(str) {
    return encodeURIComponent(str)
        .replace(/['()]/g, escape) // i.e., %27 %28 %29
        .replace(/\*/g, "%2A")
        .replace(/%(?:7C|60|5E)/g, unescape);
}

const createZip = async (files, res) => {
    const archive = archiver("zip", {
        zlib: { level: 9 }, // Set compression level
    });

    // Pipe the ZIP file to the response object
    archive.pipe(res);

    // Add article files to the ZIP in the 'article' folder
    files.forEach((file) => {
        const filePath = path.join("article", path.basename(file));
        archive.file(file, { name: filePath });
    });

    // Finalize the ZIP and send it
    archive.finalize();
};

export const downloadController = async (req, res, next) => {
    const { id } = req.params;

    try {
        const judging = await JudgingArticle.findById(id);
        if (!judging) {
            throw new APIError({
                message: getMessage("judging not found"),
                status: 404,
            });
        }

        // Extract user ID from the file path and fetch user details
        if (!judging.files || judging.files.length === 0) {
            throw new APIError({
                message: getMessage("No files associated with this article"),
                status: 400,
            });
        }

        // Attempt to extract user ID from the file path

        const userId = judging.referee;

        const user = await User.findById(userId); // Fetch user details using the User model
        if (!user) {
            throw new APIError({
                message: getMessage("User not found"),
                status: 404,
            });
        }

        // Create a custom file name using the user's first and last name
        // Encode the filename to handle special characters
        // Encode the filename
        const encodedFileName = encodeRFC5987ValueChars(
            `${user.firstName}_${user.lastName}.zip`
        );

        // Set headers
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename*=UTF-8''${encodedFileName}`
        );

        await createZip(judging.files, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
