import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
  const filesDir = 'files';
  const fileName = 'fileToRemove.txt';
  const errorMessage = 'FS operation failed';

  const filePath = join(__dirname, filesDir, fileName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

await remove();
