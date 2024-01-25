import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const read = async () => {
    const sourceDir = './files';
    const fileName = 'fileToRead.txt';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const pathName = path.join(currentDirPath, sourceDir, fileName);

    try {
        const fileContent = await fs.readFile(pathName, 'utf-8');

        console.log(`Content of ${pathName}:`);
        console.log(fileContent);
    } catch {
        throw Error(errorMessage);
    }
};

await read();
