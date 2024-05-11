import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistsResponse = await spotifyApiRequest<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
        fetch,
        "me/playlists?limit=50",
        {
            method: "GET",
            accessToken: locals.accessToken,
            fetchAll: true,
        },
    );

    return {
        playlists: playlistsResponse.items,
    };
}) satisfies PageServerLoad;
