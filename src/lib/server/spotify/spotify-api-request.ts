import cache from "memory-cache";

import type { SpotifyRequestOptions } from "@types";
import { log } from "../utility";
import { error } from "@sveltejs/kit";

const isPagingObject = (obj: unknown): obj is SpotifyApi.PagingObject<unknown> => {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }

    const pagingObject = obj as SpotifyApi.PagingObject<unknown>;

    return Array.isArray(pagingObject["items"]) && typeof pagingObject["next"] !== "undefined";
};

const isNestedPagingObject = (obj: unknown): obj is Record<string, SpotifyApi.PagingObject<unknown>> => {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        return false;
    }

    const keys = Object.keys(obj);
    const firstKey = keys[0];

    if (!firstKey) {
        return false;
    }

    const record = obj as Record<string, unknown>;

    return isPagingObject(record[firstKey]);
};

const CACHE_DEFAULT_TIME = 60000;

export const spotifyApiRequest = async <T = string>(
    svelteFetch: typeof fetch,
    endpoint: string,
    options: SpotifyRequestOptions,
): Promise<T> => {
    const { accessToken, method } = options;

    let payload = "";
    if (method === "POST" || method === "PUT") {
        payload = options.body ? JSON.stringify(options.body) : "";
    }

    const uri = `https://api.spotify.com/v1/${endpoint}`;

    if (method === "GET" && options.cache) {
        const cachedData = cache.get(uri);
        if (cachedData) {
            return cachedData as T;
        }
    }

    const res = await svelteFetch(uri, {
        method,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        ...(payload ? { body: payload } : null),
    });

    if (!res.ok) {
        log("error", `Failed to ${method} ${endpoint}: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to ${method} ${endpoint}: ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        return "OK" as unknown as T;
    }

    const data = (await res.json()) as T;

    if (method === "GET" && options.fetchAll) {
        if (isPagingObject(data) && data.next !== null) {
            const uri = data.next.split("v1/")[1];
            if (!uri) {
                error(500, "Spotify API request failed, Unexpected error");
            }

            const nextData = (await spotifyApiRequest<T>(svelteFetch, uri, {
                method: "GET",
                accessToken,
                fetchAll: options.fetchAll,
            })) as SpotifyApi.PagingObject<unknown>;

            const fullData = {
                ...data,
                items: [...data["items"], ...nextData["items"]],
            };

            if (options.cache) {
                cache.put(uri, fullData, options.cacheTime || CACHE_DEFAULT_TIME);
            }

            return fullData;
        }

        /**
         * The Spotify API has multiple cases where the paging object is nested in another object.
         */
        if (isNestedPagingObject(data)) {
            const keys = Object.keys(data);
            const firstKey = keys[0];

            if (!firstKey) {
                error(500, "Spotify API request failed, Unexpected error");
            }

            const pagingObject = data[firstKey] as SpotifyApi.PagingObject<unknown>;
            if (pagingObject.next !== null) {
                const uri = pagingObject.next.split("v1/")[1];
                if (!uri) {
                    error(500, "Spotify API request failed, Unexpected error");
                }

                const nextData = (await spotifyApiRequest<T>(svelteFetch, uri, {
                    method: "GET",
                    accessToken,
                    fetchAll: options.fetchAll,
                })) as Record<string, SpotifyApi.PagingObject<unknown>>;

                const nextDataPagingObject = nextData[firstKey] as SpotifyApi.PagingObject<unknown>;

                const fullData = {
                    ...data,
                    [firstKey]: {
                        ...data[firstKey],
                        items: [...pagingObject["items"], ...nextDataPagingObject["items"]],
                    },
                };

                if (options.cache) {
                    cache.put(uri, fullData, options.cacheTime || CACHE_DEFAULT_TIME);
                }

                return fullData;
            }
        }
    }

    if (method === "GET" && options.cache) {
        cache.put(uri, data, options.cacheTime || CACHE_DEFAULT_TIME);
    }

    return data;
};
