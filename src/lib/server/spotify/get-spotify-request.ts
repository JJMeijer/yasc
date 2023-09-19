import { log } from "$lib/server/utility";

const isPagingObject = (obj: unknown): obj is SpotifyApi.PagingObject<unknown> => {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }

    const pagingObject = obj as SpotifyApi.PagingObject<unknown>;

    return Array.isArray(pagingObject["items"]) && typeof pagingObject["next"] !== "undefined";
};

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

    const data = (await res.json()) as T;

    if (isPagingObject(data) && data.next !== null) {
        const uri = data.next.split("v1/")[1];
        if (!uri) {
            return data;
        }

        const nextData = (await getSpotifyRequest<T>(svelteFetch, accessToken, uri)) as SpotifyApi.PagingObject<unknown>;

        return {
            ...data,
            items: [...data["items"], ...nextData["items"]],
        };
    }

    return data;
};
