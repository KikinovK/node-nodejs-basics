import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getDirNameFromUrl = (url) => {
  const currentFilePath = fileURLToPath(url);
  return dirname(currentFilePath);
}
