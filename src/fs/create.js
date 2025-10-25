import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
  const filesDir = 'files';
  const fileName = 'fresh.txt';
  const fileContent = 'I am fresh and young';
  const errorMessage = 'FS operation failed';
  const writeFlag = 'wx';

  const filePath = join(__dirname, filesDir, fileName);

  try {
    await fs.writeFile(filePath, fileContent, { flag: writeFlag });
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

await create();
