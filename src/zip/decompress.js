import { createReadStream, createWriteStream, promises as fs } from 'fs';
import { createGunzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const filesDir = 'files';
  const inputFile = 'archive.gz';
  const outputFile = 'fileToCompress.txt';

  const inputPath = join(__dirname, filesDir, inputFile);
  const outputPath = join(__dirname, filesDir, outputFile);

  const startMessage = `Decompressing ${inputFile} to ${outputFile}...`;
  const successMessage = 'Decompression completed successfully.';
  const errorMessage = 'Decompression failed:';

  process.stdout.write(startMessage + '\n');

  const readStream = createReadStream(inputPath);
  const writeStream = createWriteStream(outputPath, { flags: 'wx' });
  const gunzipStream = createGunzip();

  readStream.on('error', (error) => {
    process.stderr.write(`${errorMessage} ${error.message}\n`);
    writeStream.destroy();
    fs.unlink(outputPath).catch(() => {});
  });

  writeStream.on('error', (error) => {
    process.stderr.write(`${errorMessage} ${error.message}\n`);
  });

  gunzipStream.on('error', (error) => {
    process.stderr.write(`${errorMessage} ${error.message}\n`);
    writeStream.destroy();
    fs.unlink(outputPath).catch(() => {});
  });

  writeStream.on('finish', () => {
    process.stdout.write(successMessage + '\n');
  });

  readStream.pipe(gunzipStream).pipe(writeStream);
};

await decompress();
