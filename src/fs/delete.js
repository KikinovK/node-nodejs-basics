import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const remove = async () => {
    const sourceDir = './files';
    const fileName = 'fileToRemove.txt';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const pathName = path.join(currentDirPath, sourceDir, fileName);

    try {
        await fs.unlink(pathName);
    } catch {
        throw Error(errorMessage);
    }
}

await remove();
