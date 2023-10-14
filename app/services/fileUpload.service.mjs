// services/fileUploadService.js

const uploadPath = "./public/uploads/"; // Choose your upload path

export const uploadFile = async (file) => {
    try {
        const filePath = uploadPath + file.name;
        await file.mv(filePath);
        return { status: "success", path: filePath };
    } catch (err) {
        console.error(err);
        throw new Error("File upload failed");
    }
};
