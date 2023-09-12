import { getSpotifyRequest } from "$lib/spotify";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
    }

    const { playlistId } = params;

    const playlistData = await getSpotifyRequest<SpotifyApi.SinglePlaylistResponse>(
        fetch,
        locals.accessToken,
        `playlists/${playlistId}`,
    );

    return {
        accessToken: locals.accessToken,
        username: locals.username,
        playlist: playlistData,
    };
}) satisfies PageServerLoad;
