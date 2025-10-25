import { Transform } from 'stream';

const transform = async () => {
  const promptMessage = 'Enter text to transform: ';
  const resultMessage = 'Transformed text: ';
  const exitMessage = '(press Ctrl + C to exit)\n\n';

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const original = chunk.toString();

      const text = original.replace(/[\x00-\x1F\x7F]/g, '');
      const transformed = text.split('').reverse().join('') + '\n';
      callback(null, resultMessage + transformed + exitMessage + promptMessage);
    }
  });

  process.stdout.write(promptMessage);
  process.stdin.pipe(transformStream).pipe(process.stdout);
};

await transform();
