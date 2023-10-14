import { uploadFile } from "../services/fileUpload.service.mjs";

export const handleFileUpload = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    try {
        const files = req.files;
        let uploadResults = [];

        for (const [key, file] of Object.entries(files)) {
            const result = await uploadFile(file, key);
            uploadResults.push(result);
            console.log(uploadResults);
        }
        if (uploadResults.length == 1) uploadResults = uploadResults[0];

        res.status(200).json(uploadResults);
    } catch (err) {
        next(err);
    }
};
