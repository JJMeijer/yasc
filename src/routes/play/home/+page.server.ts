import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistsPromise = spotifyApiRequest<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
        fetch,
        `me/playlists?limit=16`,
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    const featuredPlaylistsPromise = spotifyApiRequest<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
        fetch,
        `browse/featured-playlists?limit=16`,
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    const [playlists, featuredPlaylists] = await Promise.all([playlistsPromise, featuredPlaylistsPromise]);

    return {
        playlists: playlists.items,
        featured: featuredPlaylists.playlists.items,
    };
}) satisfies PageServerLoad;
