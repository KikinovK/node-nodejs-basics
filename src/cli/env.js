const parseEnv = () => {
    const environmentVariables = process.env;

    for (const [key, value] of Object.entries(environmentVariables)) {
        if (key.startsWith('RSS_')) {
            console.log(`${key}=${value}`);
        }
    }
};

parseEnv();
