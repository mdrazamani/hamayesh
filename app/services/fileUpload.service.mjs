import fs from "fs";
import path from "path";

const uploadPath = "./public/uploads/"; // Choose your upload path

export const uploadFile = async (file, key) => {
    try {
        let filePath = path.join(uploadPath, `${key}/${file.name}`);

        // Check if file already exists
        let fileExtension = path.extname(file.name);
        let fileNameWithoutExtension = path.basename(file.name, fileExtension);
        let newFileName = file.name;
        let i = 1;

        while (fs.existsSync(filePath)) {
            newFileName = `${fileNameWithoutExtension}(${i})${fileExtension}`;
            filePath = path.join(uploadPath, `${key}/${newFileName}`);
            i++;
        }

        await file.mv(filePath);
        return {
            objectName: key,
            status: "success",
            path: filePath,
            name: newFileName,
            mimetype: file.mimetype,
            size: file.size,
        };
    } catch (err) {
        console.error(err);
        throw new Error("File upload failed: " + err.message);
    }
};
