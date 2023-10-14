// controllers/fileUploadController.js

import { uploadFile } from "../services/fileUpload.service.mjs";

export const handleFileUpload = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    const file = req.files.file;

    try {
        const result = await uploadFile(file);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
