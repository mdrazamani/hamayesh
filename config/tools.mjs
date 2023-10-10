import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPath = (yourPath, importMetaUrl = import.meta.url) => {
    const __dirname = dirname(fileURLToPath(importMetaUrl));
    return path.join(__dirname, yourPath);
};

export const createFilePath = (yourPath, importMetaUrl = import.meta.url) => {
    const __dirname = dirname(fileURLToPath(importMetaUrl));
    return path.join(`file://${path.join(__dirname, yourPath)}`);
};
