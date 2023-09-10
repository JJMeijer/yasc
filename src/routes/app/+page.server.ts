import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
    }

    const playlists = await getSpotifyRequest<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `me/playlists`,
    );

    return {
        username: locals.username,
        playlists: playlists.items,
    };
}) satisfies PageServerLoad;
