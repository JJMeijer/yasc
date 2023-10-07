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
        `me/playlists?limit=15`,
    );

    const featuredPlaylistsPromise = getSpotifyRequest<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `browse/featured-playlists?limit=15`,
    );

    const [playlists, featuredPlaylists] = await Promise.all([playlistsPromise, featuredPlaylistsPromise]);

    return {
        playlists: playlists.items,
        featured: featuredPlaylists.playlists.items,
    };
}) satisfies PageServerLoad;
