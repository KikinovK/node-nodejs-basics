import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const rename = async () => {
    const sourceDir = './files';
    const sourceFile = 'wrongFilename.txt';
    const targetFile = 'properFilename.md';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const sourceFilePath = path.resolve(currentDirPath, sourceDir, sourceFile);
    const targetFilePath = path.resolve(currentDirPath, sourceDir, targetFile);

    try {
        try {
            await fs.access(targetFilePath);
            throw new Error(`Target file '${targetFile}' already exists.`);
        } catch(error) {
            if (error.code !== 'ENOENT') {
                throw new Error(error.message);
            }
            await fs.rename(sourceFilePath, targetFilePath);
        }
    } catch(error) {
        throw new Error(`${errorMessage}: ${error.message}`);
    }
};

await rename();
