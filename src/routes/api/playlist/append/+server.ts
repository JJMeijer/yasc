import { spotifyApiRequest } from "$lib/server/spotify";
import { error, type RequestHandler } from "@sveltejs/kit";
import type { AppendPlaylistData } from "@types";

const validateRequestBody = (body: unknown): body is AppendPlaylistData => {
    if (typeof body !== "object" || body === null) {
        return false;
    }

    const { playlistId, uris } = body as AppendPlaylistData;

    if (!playlistId || typeof playlistId !== "string") {
        return false;
    }

    if (!Array.isArray(uris)) {
        return false;
    }

    if (uris.some((uri) => typeof uri !== "string")) {
        return false;
    }

    return true;
};

export const POST: RequestHandler = async ({ fetch, locals, request }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const body = await request.json();

    if (!validateRequestBody(body)) {
        throw error(400, "Bad Request");
    }

    await spotifyApiRequest(fetch, `playlists/${body.playlistId}/tracks`, {
        method: "POST",
        accessToken: locals.accessToken,
        body: {
            uris: body.uris,
        },
    });

    return new Response(null);
};
