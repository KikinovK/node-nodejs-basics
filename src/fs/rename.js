import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const rename = async () => {
    const sourceDir = './files';
    const sourceFile = 'wrongFilename.txt';
    const targetFile = 'wrongFilename.md';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const sourceFilePath = path.resolve(currentDirPath, sourceDir, sourceFile);
    const targetFilePath = path.resolve(currentDirPath, sourceDir, targetFile);

    try {
        await fs.rename(sourceFilePath, targetFilePath);
    } catch {
        throw Error(errorMessage);
    }
};

await rename();
