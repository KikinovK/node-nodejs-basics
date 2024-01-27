import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const calculateHash = async () => {
    const sourceDir = './files';
    const fileName = 'fileToCalculateHashFor.txt';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const filePath = path.join(currentDirPath, sourceDir, fileName);

    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    fileStream.on('end', () => {
        const fileHash = hash.digest('hex');
        const consoleStream = process.stdout;

        consoleStream.write(`SHA256 hash of file '${filePath}': ${fileHash}\n`);
    });

    fileStream.on('error', (error) => {
        console.error('Error reading file:', error);
    });
};

await calculateHash();
