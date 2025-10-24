import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
  const filesDir = 'files';
  const errorMessage = 'FS operation failed';

  const dirPath = join(__dirname, filesDir);

  try {
    const files = await fs.readdir(dirPath);

    console.log(`Files in ${dirPath}:`);
    files.forEach(file => {
        console.log(file);
    });
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

await list();
