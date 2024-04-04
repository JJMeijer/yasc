import { spotifyApiRequest } from "$lib/server/spotify";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistId = url.searchParams.get("playlistId");

    if (!playlistId || typeof playlistId !== "string") {
        throw error(400, "Bad Request");
    }

    const res = await spotifyApiRequest(fetch, `playlists/${playlistId}/followers/contains?ids=${locals.userId}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    return json(res);
};

export const PUT: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistId = url.searchParams.get("playlistId");

    if (!playlistId || typeof playlistId !== "string") {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `playlists/${playlistId}/followers`, {
        method: "PUT",
        accessToken: locals.accessToken,
    });

    return new Response(null);
};

export const DELETE: RequestHandler = async ({ fetch, locals, url }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistId = url.searchParams.get("playlistId");

    if (!playlistId || typeof playlistId !== "string") {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `playlists/${playlistId}/followers`, {
        method: "DELETE",
        accessToken: locals.accessToken,
    });

    return new Response(null);
};
