// middlewares/fileUploadMiddleware.js

import fileUpload from "express-fileupload";

export default fileUpload({
    createParentPath: true, // Automatically create parent path
    limits: {
        fileSize: 10 * 1024 * 1024, // Set file size limit to 10MB
    },
    abortOnLimit: true, // Abort uploading the file if it hits the size limit
    // safeFileNames: true, // Strip off reserved characters from the filename
    // preserveExtension: true, // Preserve file extension
    useTempFiles: true, // Use temp directory to store files during upload
    tempFileDir: "/path/to/tmp", // Define the temp directory
    uploadTimeout: 0, // No timeout for upload
});

// Helper function to validate file type
export function validateFileType(file) {
    // Define the allowed extensions
    const allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif|\.pdf|\.doc|\.docx|\.ppt|\.pptx)$/i;

    // Define the allowed MIME types
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword", // For .doc files
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // For .docx files
        "application/vnd.ms-powerpoint", // For .ppt files
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // For .pptx files
    ];

    // Check the file extension and MIME type
    if (
        !allowedExtensions.test(file.name) ||
        !allowedMimeTypes.includes(file.mimetype)
    ) {
        return false;
    }
    return true;
}
