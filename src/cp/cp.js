import { spawn } from 'child_process';
import path from 'path';
import { getDirNameFromUrl } from '../utils/getDirNameFromUrl.js';

const spawnChildProcess = async (args) => {
    const sourceDir = './files';
    const processFileName = 'script.js';

    const currentDirPath = getDirNameFromUrl(import.meta.url);
    const processFilePath = path.join(currentDirPath, sourceDir, processFileName);

    const childProcess = spawn('node', [processFilePath, ...args], { stdio: ['pipe', 'pipe', 'inherit'] });

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);

    childProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    childProcess.on('error', (err) => {
        console.error('Error spawning child process:', err);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['arg1', 'arg2', 'arg3']);
