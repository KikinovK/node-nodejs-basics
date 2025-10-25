import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const filesDir = 'files';
  const fileName = 'fileToWrite.txt';

  const filePath = join(__dirname, filesDir, fileName);
  const writeStream = createWriteStream(filePath);

  process.stdin.pipe(writeStream);

  writeStream.on('open', () => {
    process.stdout.write(`Writing to ${fileName}\nEnter your details (press Ctrl + C to complete entry):\n`);
  });

  writeStream.on('error', (error) => {
    process.stderr.write(`Error writing file: ${error.stack || error.message}\n`);
  });

  process.on('SIGINT', () => {
    writeStream.end(() => {
      process.stdout.write('\nWriting completed.\n');
      process.exit(0);
    });
  });
};

await write();
