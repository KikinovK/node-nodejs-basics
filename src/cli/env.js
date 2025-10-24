const parseEnv = () => {
  const prefix = 'RSS_';
  const separator = '; ';

  const rssVars = Object.entries(process.env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`)
    .join(separator);

  console.log(rssVars);
};

parseEnv();
