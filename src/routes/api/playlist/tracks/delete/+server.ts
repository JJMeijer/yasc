import { spotifyApiRequest } from "$lib/server/spotify";
import { error, type RequestHandler } from "@sveltejs/kit";
import type { DeletePlaylistData } from "@types";

const validateRequestBody = (body: unknown): body is DeletePlaylistData => {
    if (typeof body !== "object" || body === null) {
        return false;
    }

    const { playlistId, uris, snapshotId } = body as DeletePlaylistData;

    if (!playlistId || typeof playlistId !== "string") {
        return false;
    }

    if (!snapshotId || typeof snapshotId !== "string") {
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

export const DELETE: RequestHandler = async ({ fetch, locals, request }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const body = await request.json();

    if (!validateRequestBody(body)) {
        throw error(400, "Bad Request");
    }

    const payload = {
        snapshot_id: body.snapshotId,
        tracks: body.uris.map((uri) => ({ uri })),
    };

    console.log(payload);

    await spotifyApiRequest(fetch, `playlists/${body.playlistId}/tracks`, {
        method: "DELETE",
        accessToken: locals.accessToken,
        body: payload,
    });

    return new Response(null);
};
