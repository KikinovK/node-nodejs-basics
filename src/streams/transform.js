import { Transform } from 'stream';

const reverseText = new Transform({
    transform(chunk, encoding, callback) {
        const reversedChunk = chunk.toString().split('').reverse().join('');
        this.push(`${reversedChunk}\n\n`);
        callback();
    }
});

const transform = async () => {
    process.stdin
        .pipe(reverseText)
        .pipe(process.stdout);

    console.log('Enter your details (press Ctrl + C to complete entry):');
};

await transform();
