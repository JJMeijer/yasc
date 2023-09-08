import { log } from "console";

export const getSpotifyRequest = async <T>(svelteFetch: typeof fetch, accessToken: string, endpoint: string): Promise<T> => {
    const res = await svelteFetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        log("error", `Failed to get ${endpoint}: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to get ${endpoint}: ${res.status} ${res.statusText}`);
    }

    return (await res.json()) as T;
};
