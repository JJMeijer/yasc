type LogType = "request" | "fetch" | "error" | "info" | "warn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (type: LogType, ...args: any[]) => {
    const typeLookup = {
        request: "[ RQST ]",
        fetch: "[ FTCH ]",
        error: "[ ERRO ]",
        info: "[ INFO ]",
        warn: "[ WARN ]",
    };

    console.log(`${typeLookup[type]} ${new Date().toLocaleTimeString()}`, ...args);
};
