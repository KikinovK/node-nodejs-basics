import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
  const filesDir = 'files';
  const oldFileName = 'wrongFilename.txt';
  const newFileName = 'properFilename.md';
  const errorMessage = 'FS operation failed';

  const oldFilePath = join(__dirname, filesDir, oldFileName);
  const newFilePath = join(__dirname, filesDir, newFileName);

  try {
    await fs.access(oldFilePath);
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }

  try {
    await fs.access(newFilePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.message === errorMessage) throw new Error(`${errorMessage}: file already exists`);
  }

  try {
    await fs.rename(oldFilePath, newFilePath);
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

await rename();
