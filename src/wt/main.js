import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const numCores = cpus().length;
  const workerPath = join(__dirname, 'worker.js');
  const startNumber = 10;
  
  const promises = [];
  
  for (let i = 0; i < numCores; i++) {
    const promise = new Promise((resolve) => {
      const worker = new Worker(workerPath);
      const numberToSend = startNumber + i;
      
      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
        worker.terminate();
      });
      
      worker.on('error', () => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });
      
      worker.postMessage(numberToSend);
    });
    
    promises.push(promise);
  }
  
  const results = await Promise.all(promises);
  console.log(results);
};

await performCalculations();
