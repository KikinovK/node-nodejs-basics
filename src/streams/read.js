import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filesDir = 'files';
  const fileName = 'fileToRead.txt';

  const filePath = join(__dirname, filesDir, fileName);
  const readStream = createReadStream(filePath);

  readStream.on('open', () => {
    process.stdout.write(`File of ${fileName}:\n`);
  });

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on('end', () => {
    process.stdout.write('\n');
  });

  readStream.on('error', (error) => {
    process.stderr.write(`Error reading file: ${error.stack || error.message}\n`);
  });
};

await read();
