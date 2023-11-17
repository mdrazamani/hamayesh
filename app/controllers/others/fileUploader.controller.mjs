import { validateFileType } from "../../../config/fileUpload.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { uploadFile } from "../../services/fileUpload.service.mjs";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const singleFileUploadFolders = ["profile", "organizer_logo", "supporter_logo"]; // Add more folder names as needed

export const handleFileUpload = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const userId = req.user.id; // Assuming user ID is available
    const propertyName = Object.keys(req.files)[0]; // Extracting the property name, e.g., "profile"
    // const isSingleFileUpload = singleFileUploadFolders.includes(propertyName);

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

    // const specificUploadDirectory = path.join(
    //     userUploadDirectory,
    //     propertyName
    // );

    try {
        // Ensure user-specific folder exists
        if (!fs.existsSync(userUploadDirectory)) {
            fs.mkdirSync(userUploadDirectory, { recursive: true });
        }
        // if (isSingleFileUpload) {
        //     // Get the most recent file in the specific subdirectory
        //     const existingFiles = fs
        //         .readdirSync(specificUploadDirectory)
        //         .map((fileName) => {
        //             const filePath = path.join(
        //                 specificUploadDirectory,
        //                 fileName
        //             );
        //             return {
        //                 name: fileName,
        //                 time: fs.statSync(filePath).mtime.getTime(),
        //                 path: filePath,
        //             };
        //         });

        //     // Sort files by modification time in descending order
        //     existingFiles.sort((a, b) => b.time - a.time);

        //     // Delete the most recent file
        //     if (
        //         existingFiles.length > 0 &&
        //         fs.lstatSync(existingFiles[0].path).isFile()
        //     ) {
        //         fs.unlinkSync(existingFiles[0].path);
        //     }
        // }

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
