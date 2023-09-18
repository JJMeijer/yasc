import { getSpotifyRequest } from "$lib/server/spotify";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { playlistId } = params;

    const playlistData = await getSpotifyRequest<SpotifyApi.SinglePlaylistResponse>(
        fetch,
        locals.accessToken,
        `playlists/${playlistId}`,
    );

    return {
        playlist: playlistData,
    };
}) satisfies PageServerLoad;
