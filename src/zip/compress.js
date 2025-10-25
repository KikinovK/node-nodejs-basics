import { createReadStream, createWriteStream, promises as fs } from 'fs';
import { createGzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
  const filesDir = 'files';
  const inputFile = 'fileToCompress.txt';
  const outputFile = 'archive.gz';

  const inputPath = join(__dirname, filesDir, inputFile);
  const outputPath = join(__dirname, filesDir, outputFile);

  const startMessage = `Compressing ${inputFile} to ${outputFile}...`;
  const successMessage = 'Compression completed successfully.';
  const errorMessage = 'Compression failed:';

  process.stdout.write(startMessage + '\n');

  const readStream = createReadStream(inputPath);
  const writeStream = createWriteStream(outputPath, { flags: 'wx' });
  const gzipStream = createGzip();

  readStream.on('error', (error) => {
    process.stderr.write(`${errorMessage} ${error.message}\n`);
    writeStream.destroy();
    fs.unlink(outputPath).catch(() => {});
  });

  writeStream.on('error', (error) => {
    process.stderr.write(`${errorMessage} ${error.message}\n`);
  });

  gzipStream.on('error', (error) => {
    process.stderr.write(`${errorMessage} ${error.message}\n`);
    writeStream.destroy();
    fs.unlink(outputPath).catch(() => {});
  });

  writeStream.on('finish', () => {
    process.stdout.write(successMessage + '\n');
  });

  readStream.pipe(gzipStream).pipe(writeStream);
};

await compress();
