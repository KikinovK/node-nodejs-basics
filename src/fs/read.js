import fs from 'fs/promises';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const read = async () => {
    const sourceDir = './files';
    const fileName = 'fileToRead.txt';
    const errorMessage = 'FS operation failed';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const pathName = path.resolve(currentDirPath, sourceDir, fileName);

    try {
        const fileContent = await fs.readFile(pathName, 'utf-8');

        console.log(`Content of ${pathName}:`);
        console.log(fileContent);
    } catch(error) {
        throw new Error(`${errorMessage}: ${error.message}`);
    }
};

await read();
