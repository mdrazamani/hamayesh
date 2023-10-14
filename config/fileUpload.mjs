// middlewares/fileUploadMiddleware.js

import fileUpload from "express-fileupload";

export default fileUpload({
    createParentPath: true,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
});
