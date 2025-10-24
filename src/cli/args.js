const parseArgs = () => {
  const argPrefix = '--';
  const separator = ', ';
  const connector = ' is ';

  const args = process.argv.slice(2);
  const result = [];

  for (let i = 0; i < args.length; i += 2) {
    if (args[i].startsWith(argPrefix)) {
      const propName = args[i].slice(2);
      const value = args[i + 1];
      result.push(`${propName}${connector}${value}`);
    }
  }

  console.log(result.join(separator));
};

parseArgs();
