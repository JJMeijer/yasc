import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const likedArtists = await spotifyApiRequest<SpotifyApi.UsersFollowedArtistsResponse>(
        fetch,
        `me/following?type=artist&limit=50`,
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    return {
        artists: likedArtists.artists.items,
    };
}) satisfies PageServerLoad;
