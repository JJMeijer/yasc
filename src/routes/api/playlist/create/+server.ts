import { spotifyApiRequest } from "$lib/server/spotify";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import type { CreatePlaylistData } from "@types";

const validateRequestBody = (body: unknown): body is CreatePlaylistData => {
    if (typeof body !== "object" || body === null) {
        return false;
    }

    const { name, description, uris } = body as CreatePlaylistData;

    if (typeof name !== "string") {
        return false;
    }

    if (typeof description !== "string") {
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

    const createPlaylistReponse = await spotifyApiRequest<SpotifyApi.CreatePlaylistResponse>(
        fetch,
        `users/${locals.userId}/playlists`,
        {
            method: "POST",
            accessToken: locals.accessToken,
            body: {
                name: body.name,
                public: false,
                description: body.description,
            },
        },
    );

    const { id: playlistId } = createPlaylistReponse;

    await spotifyApiRequest<SpotifyApi.AddTracksToPlaylistResponse>(fetch, `playlists/${playlistId}/tracks`, {
        method: "POST",
        accessToken: locals.accessToken,
        body: {
            uris: body.uris,
        },
    });

    return json({
        playlistId,
    });
};
