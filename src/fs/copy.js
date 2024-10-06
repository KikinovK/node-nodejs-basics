import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const copyRecursive = async (source, target) => {
    const files = await fs.readdir(source);
    for (const file of files) {
        const sourceFile = path.resolve(source, file);
        const targetFile = path.resolve(target, file);
        const stats = await fs.lstat(sourceFile);
        if (stats.isDirectory()) {
            await fs.mkdir(targetFile);
            await copyRecursive(sourceFile, targetFile);
        } else {
            await fs.copyFile(sourceFile, targetFile);
        }
    };
};

const copy = async () => {
    const sourceDir = 'files';
    const targetDir = 'files_copy';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const sourcePath = path.resolve(currentDirPath, sourceDir);
    const targetPath = path.resolve(currentDirPath, targetDir);

    try {
        await fs.mkdir(targetPath);
        await copyRecursive(sourcePath, targetPath);
    } catch(error) {
        throw new Error(`${errorMessage}: ${error.message}`);
    }

};

await copy();
