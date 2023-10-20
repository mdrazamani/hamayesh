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

            if (Array.isArray(file)) {
                // If we're dealing with an array of files, we handle each file
                for (const nestedFile of file) {
                    const result = await uploadFile(nestedFile, key);
                    uploadResults.push(result);
                    Results[key] = uploadResults;
                }
            } else {
                // If we're dealing with a single file, we handle it here
                const result = await uploadFile(file, key);
                uploadResults.push(result);
                Results[key] = result;
            }
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
