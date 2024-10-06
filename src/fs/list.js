import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const list = async () => {
    const sourceDir = './files';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const pathName = path.resolve(currentDirPath, sourceDir);

    try {
        const files = await fs.readdir(pathName);

        console.log(`Files in ${pathName}:`);
        files.forEach(file => {
            console.log(file);
        });
    } catch(error) {
        throw new Error(`${errorMessage}: ${error.message}`);
    }
};

await list();
