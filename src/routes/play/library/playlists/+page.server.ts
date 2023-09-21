import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistsResponse = await getSpotifyRequest<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `me/playlists?limit=20`,
        true,
    );

    return {
        playlists: playlistsResponse.items,
    };
}) satisfies PageServerLoad;
