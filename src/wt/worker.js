import { workerData, parentPort } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    const n = workerData;
    const fibResult = nthFibonacci(n);

    parentPort.postMessage({ status: 'resolved', data: fibResult });
};

sendResult();
