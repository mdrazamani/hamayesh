import { validateFileType } from "../../../config/fileUpload.mjs";
import { getMessage } from "../../../config/i18nConfig.mjs";
import constants from "../../../utils/constants.mjs";
import { uploadFile } from "../../services/fileUpload.service.mjs";

export const handleFileUpload = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    try {
        const files = req.files;
        let Results = {}; // We will store our categories here

        for (const [key, file] of Object.entries(files)) {
            // We will store individual upload results in this array
            let uploadResults = [];

            // Function to handle file upload and validation
            const processFile = async (file) => {
                // Validate the file type
                if (!validateFileType(file)) {
                    throw new Error(
                        `Unsupported file type for ${file.name}. Only images, Word, PDF, and PowerPoint files are allowed.`
                    );
                }

                // If the file type is valid, proceed with the upload
                const result = await uploadFile(file, key); // Assuming uploadFile is a function you've previously defined for handling uploads
                return result;
            };

            if (Array.isArray(file)) {
                // If we're dealing with an array of files, we handle each file
                for (const nestedFile of file) {
                    const result = await processFile(nestedFile);
                    uploadResults.push(result);
                }
            } else {
                // If we're dealing with a single file, we handle it here
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
        next(err); // This will handle any errors, including our custom validation error
    }
};
