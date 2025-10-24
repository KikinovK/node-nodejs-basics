import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filesDir = 'files';
  const fileName = 'fileToRead.txt';
  const errorMessage = 'FS operation failed';
  const encoding = 'utf8';

  const filePath = join(__dirname, filesDir, fileName);

  try {
    const content = await fs.readFile(filePath, encoding);
    console.log(`Content of ${filePath}:`);
    console.log(content);
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

await read();
