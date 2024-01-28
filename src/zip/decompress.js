import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const decompress = async () => {
    const sourceDir = './files';
    const archiveFileName = 'archive.gz';
    const destinationFileName = 'fileToDecompress.txt';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const archiveFilePath = path.join(currentDirPath, sourceDir, archiveFileName);
    const destinationFilePath = path.join(currentDirPath, sourceDir, destinationFileName);

    const archiveFileStream = fs.createReadStream(archiveFilePath);
    const destinationFileStream = fs.createWriteStream(destinationFilePath, { encoding: 'utf-8' });
    const gunzip = zlib.createGunzip();

    archiveFileStream
        .pipe(gunzip)
        .pipe(destinationFileStream);

    archiveFileStream.on('error', (error) => {
        console.error('Error reading archive file:', error);
    });

    destinationFileStream.on('finish', () => {
        console.log(`Archive decompressed successfully to ${destinationFilePath}`);
    });

    destinationFileStream.on('error', (error) => {
        console.error('Error writing decompressed file:', error);
    });
};

await decompress();
