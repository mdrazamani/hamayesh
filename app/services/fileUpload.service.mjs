import fs from "fs";
import path from "path";
import { getMessage } from "../../config/i18nConfig.mjs";
import APIError from "../../utils/errors.mjs";
import constants from "../../utils/constants.mjs";

export const uploadFile = async (file, key, userUploadDirectory) => {
    try {
        // Use the user-specific directory for the file path
        let filePath = path.join(userUploadDirectory, `${key}/${file.name}`);

        // Check if file already exists
        let fileExtension = path.extname(file.name);
        let fileNameWithoutExtension = path.basename(file.name, fileExtension);
        let newFileName = file.name;
        let i = 1;

        while (fs.existsSync(filePath)) {
            newFileName = `${fileNameWithoutExtension}(${i})${fileExtension}`;
            filePath = path.join(userUploadDirectory, `${key}/${newFileName}`);
            i++;
        }

        await file.mv(filePath);
        return {
            status: "success",
            path: filePath.replace(/.*\/(public.*)/, "$1"),
            name: newFileName,
            mimetype: file.mimetype,
            size: file.size,
        };
    } catch (err) {
        console.error(err);
        throw new APIError({
            message: getMessage("errors.File_upload_failed") + err.message,
            status: constants.BAD_REQUEST,
        });
    }
};
