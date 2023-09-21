import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const likedArtists = await getSpotifyRequest<SpotifyApi.UsersFollowedArtistsResponse>(
        fetch,
        locals.accessToken,
        `me/following?type=artist&limit=50`,
    );

    return {
        artists: likedArtists.artists.items,
    };
}) satisfies PageServerLoad;
