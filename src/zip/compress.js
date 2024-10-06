import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const compress = async () => {
    const sourceDir = './files';
    const sourceFileName = 'fileToCompress.txt';
    const destinationFileName = 'archive.gz';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const sourceFilePath = path.join(currentDirPath, sourceDir, sourceFileName);
    const destinationFilePath = path.join(currentDirPath, sourceDir, destinationFileName);

    const sourceFileStream = fs.createReadStream(sourceFilePath, { encoding: 'utf-8' });
    const destinationFileStream = fs.createWriteStream(destinationFilePath);
    const gzip = zlib.createGzip();

    sourceFileStream
        .pipe(gzip)
        .pipe(destinationFileStream);

    sourceFileStream.on('error', (error) => {
        console.error('Error reading source file:', error);
    });

    destinationFileStream.on('finish', () => {
        console.log(`File compressed successfully to ${destinationFilePath}`);
    });

    destinationFileStream.on('error', (error) => {
        console.error('Error writing compressed file:', error);
    });
};

await compress();
