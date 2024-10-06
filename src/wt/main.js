import { Worker } from 'worker_threads';
import path from 'path';
import os from 'os';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const performCalculations = async () => {
    const workerFileName = 'worker.js';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const workerFilePath = path.join(currentDirPath, workerFileName);

    const numCPUs = os.cpus().length;
    const workers = [];

    const results = [];

    for (let i = 0; i < numCPUs; i++) {
        const worker = new Worker(workerFilePath, { workerData: i + 10 });
        workers.push(worker);

        worker.on('message', (message) => {
            results.push(message);
            if (results.length === numCPUs) {
                console.log(results);
            }
        });

        worker.on('error', (error) => {
            console.log('error', error);
            results.push({ status: 'error', data: null });
            if (results.length === numCPUs) {
                console.log(results);
            }
        });
    }
};

await performCalculations();
