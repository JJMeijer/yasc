export const durationMsToTime = (durationMs: number) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000).toFixed(0);

    return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
};
