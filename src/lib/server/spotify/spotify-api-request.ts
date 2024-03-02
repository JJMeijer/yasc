import type { SpotifyRequestOptions } from "@types";
import { log } from "../utility";

const isPagingObject = (obj: unknown): obj is SpotifyApi.PagingObject<unknown> => {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }

    const pagingObject = obj as SpotifyApi.PagingObject<unknown>;

    return Array.isArray(pagingObject["items"]) && typeof pagingObject["next"] !== "undefined";
};

export const spotifyApiRequest = async <T = string>(
    svelteFetch: typeof fetch,
    endpoint: string,
    options: SpotifyRequestOptions,
): Promise<T> => {
    const { accessToken, method, body, fetchAll } = options;

    const res = await svelteFetch(`https://api.spotify.com/v1/${endpoint}`, {
        method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        ...(body ? { body: JSON.stringify(body) } : null),
    });

    if (!res.ok) {
        log("error", `Failed to ${method} ${endpoint}: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to ${method} ${endpoint}: ${res.status} ${res.statusText}`);
    }

    if (method !== "GET") {
        return "OK" as unknown as T;
    }

    const data = (await res.json()) as T;

    if (fetchAll && isPagingObject(data) && data.next !== null) {
        const uri = data.next.split("v1/")[1];
        if (!uri) {
            return data;
        }

        const nextData = (await spotifyApiRequest<T>(svelteFetch, uri, {
            method: "GET",
            accessToken,
            fetchAll,
        })) as SpotifyApi.PagingObject<unknown>;

        return {
            ...data,
            items: [...data["items"], ...nextData["items"]],
        };
    }

    return data;
};
