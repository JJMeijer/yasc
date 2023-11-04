import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const likedShows = await getSpotifyRequest<SpotifyApi.UsersSavedShowsResponse>(
        fetch,
        locals.accessToken,
        `me/shows?limit=50`,
    );

    return {
        shows: likedShows.items.map((show) => show.show),
    };
}) satisfies PageServerLoad;
