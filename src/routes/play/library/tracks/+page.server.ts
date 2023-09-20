import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const likedTracks = await getSpotifyRequest<SpotifyApi.UsersSavedTracksResponse>(
        fetch,
        locals.accessToken,
        `me/tracks?limit=50`,
        true,
    );

    return {
        tracks: likedTracks.items,
    };
}) satisfies PageServerLoad;
