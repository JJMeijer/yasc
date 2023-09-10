import { getSpotifyRequest } from "$lib/spotify";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals, parent }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
    }

    const { playlistId } = params;

    const data = getSpotifyRequest<SpotifyApi.SinglePlaylistResponse>(fetch, locals.accessToken, `playlists/${playlistId}`);

    await parent();

    return {
        username: locals.username,
        playlist: data,
    };
}) satisfies PageServerLoad;
