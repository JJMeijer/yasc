import { error, redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ locals }) => {
    if (!locals.accessToken) {
        throw redirect(302, "/login");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
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

    const userOwnedPlaylists = playlistsResponse.items.filter((playlist) => playlist.owner.id === locals.userId);

    return {
        username: locals.username,
        userOwnedPlaylists,
    };
}) satisfies LayoutServerLoad;
