import fs from 'fs';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const write = async () => {
    const sourceDir = './files';
    const fileName = 'fileToWrite.txt';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const filePath = path.join(currentDirPath, sourceDir, fileName);

    const fileStream = fs.createWriteStream(filePath, { encoding: 'utf-8' });

    process.stdin.pipe(fileStream);

    fileStream.on('error', (error) => {
        console.error('Error writing to file:', error);
    });

    console.log('Enter your details (press Ctrl + D to complete entry):');
};

await write();
