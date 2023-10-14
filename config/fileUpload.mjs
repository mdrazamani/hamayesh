// middlewares/fileUploadMiddleware.js

import fileUpload from "express-fileupload";

export default fileUpload({
    createParentPath: true, // Automatically create parent path
    limits: {
        fileSize: 5 * 1024 * 1024, // Set file size limit to 5MB
    },
    abortOnLimit: true, // Abort uploading the file if it hits the size limit
    // safeFileNames: true, // Strip off reserved characters from the filename
    // preserveExtension: true, // Preserve file extension
    useTempFiles: true, // Use temp directory to store files during upload
    tempFileDir: "/path/to/tmp", // Define the temp directory
    uploadTimeout: 0, // No timeout for upload
});
