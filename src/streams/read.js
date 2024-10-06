import fs from 'fs';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const read = async () => {
    const sourceDir = './files';
    const fileName = 'fileToRead.txt';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const filePath = path.resolve(currentDirPath, sourceDir, fileName);

    const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const consoleStream = process.stdout;

    consoleStream.write(`File of ${fileName}:\n`);

    fileStream.on('data', (chunk) => {
        consoleStream.write(chunk);
    });

    fileStream.on('end', () => {
        consoleStream.write('\n');
    });

    fileStream.on('error', (error) => {
        console.error('Error reading file:', error);
    });
};

await read();
