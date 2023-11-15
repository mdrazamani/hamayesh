import { validateFileType } from "../../../config/fileUpload.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { uploadFile } from "../../services/fileUpload.service.mjs";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const singleFileUploadFolders = ["profile", "avatar", "cover"]; // Add more folder names as needed

export const handleFileUpload = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const userId = req.user.id; // Assuming user ID is available
    const propertyName = Object.keys(req.files)[0]; // Extracting the property name, e.g., "profile"
    const isSingleFileUpload = singleFileUploadFolders.includes(propertyName);

    // Path for user-specific and property-specific directory
    const userUploadDirectory = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "public",
        "uploads",
        userId
    );

    try {
        // Ensure user-specific folder exists
        if (!fs.existsSync(userUploadDirectory)) {
            fs.mkdirSync(userUploadDirectory, { recursive: true });
        } else if (isSingleFileUpload) {
            // If single file upload, clear existing files in the directory
            const existingFiles = fs.readdirSync(userUploadDirectory);
            for (const file of existingFiles) {
                const filePath = path.join(userUploadDirectory, file);
                if (fs.lstatSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        const files = req.files;
        let Results = {};

        for (const [key, file] of Object.entries(files)) {
            let uploadResults = [];

            const processFile = async (file) => {
                if (!validateFileType(file)) {
                    throw new Error(`Unsupported file type for ${file.name}.`);
                }

                // Modify the upload path to include the user-specific folder
                const result = await uploadFile(file, key, userUploadDirectory);
                return result;
            };

            if (Array.isArray(file)) {
                for (const nestedFile of file) {
                    const result = await processFile(nestedFile);
                    uploadResults.push(result);
                }
            } else {
                const result = await processFile(file);
                uploadResults.push(result);
            }

            Results[key] = uploadResults;
        }

        return res.respond(
            constants.CREATED,
            getMessage("success.success"),
            Results
        );
    } catch (err) {
        next(err);
    }
};
