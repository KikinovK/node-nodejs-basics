import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  const sourceDir = 'files';
  const targetDir = 'files_copy';
  const errorMessage = 'FS operation failed';

  const sourcePath = join(__dirname, sourceDir);
  const targetPath = join(__dirname, targetDir);

  try {
    await fs.access(sourcePath);
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }

  try {
    await fs.access(targetPath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.message === errorMessage) throw new Error(`${errorMessage}: directory already exists`);
  }

  try {
    await fs.cp(sourcePath, targetPath, { recursive: true });
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
};

await copy();
