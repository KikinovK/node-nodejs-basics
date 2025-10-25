import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
  const filesDir = 'files';
  const fileName = 'fileToCalculateHashFor.txt';
  const algorithm = 'sha256';
  const encoding = 'hex';

  const filePath = join(__dirname, filesDir, fileName);
  const hash = createHash(algorithm);
  const stream = createReadStream(filePath);

  stream.on('error', error => {
    console.error('Error reading file:', error);
  });

  stream.pipe(hash).setEncoding(encoding);

  hash.on('readable', () => {
    const fileHash = hash.read();
    if (fileHash) {
      process.stdout.write(`SHA256 hash of file '${filePath}': ${fileHash}\n`);
    }
  });
};

await calculateHash();
