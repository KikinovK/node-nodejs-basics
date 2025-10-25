import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
  const scriptPath = join(__dirname, 'files', 'script.js');
  const nodeExecutable = 'node';
  
  const childProcess = spawn(nodeExecutable, [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit']
  });
  
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
