import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const create = async () => {

    const fileName = 'fresh.txt';
    const content = 'I am fresh and young';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const pathName = path.join(currentDirPath, fileName);

    try {
        fs.writeFile(pathName, content);
    } catch {
        throw new Error(errorMessage);
    }

};

await create();
