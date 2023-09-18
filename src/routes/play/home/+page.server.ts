import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistsPromise = getSpotifyRequest<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `me/playlists?limit=50`,
    );

    const [playlists] = await Promise.all([playlistsPromise]);

    return {
        playlists: playlists.items,
    };
}) satisfies PageServerLoad;
