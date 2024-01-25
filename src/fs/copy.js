import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const copyRecursive = async (source, target) => {
    const files = await fs.readdir(source);
    files.forEach(async (file) => {
        const sourceFile = path.join(source, file);
        const targetFile = path.join(target, file);
        const stats = await fs.lstat(sourceFile);
        if (stats.isDirectory()) {
            await fs.mkdir(targetFile);
            await copyRecursive(sourceFile, targetFile);
        } else {
            await fs.copyFile(sourceFile, targetFile);
        }
    });
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
        copyRecursive(sourcePath, targetPath);
    } catch {
        throw Error(errorMessage);
    }


};

await copy();
