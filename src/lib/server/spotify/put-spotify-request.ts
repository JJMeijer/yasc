import { log } from "$lib/server/utility";

export const putSpotifyRequest = async (
    svelteFetch: typeof fetch,
    accessToken: string,
    endpoint: string,
    body: Record<string, unknown>,
): Promise<string> => {
    const res = await svelteFetch(`https://api.spotify.com/v1/${endpoint}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        log("error", `Failed to put ${endpoint}: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to put ${endpoint}: ${res.status} ${res.statusText}`);
    }

    return "OK";
};
