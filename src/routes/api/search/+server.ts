import { spotifyApiRequest } from "$lib/server/spotify";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const query = url.searchParams.get("q");

    if (!query) {
        throw error(400, "Bad Request");
    }

    const results = await spotifyApiRequest<SpotifyApi.SearchResponse>(
        fetch,
        `search?q=${query}&type=album,artist,playlist,track`,
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    return json(results);
};
