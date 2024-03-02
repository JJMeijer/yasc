import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const likedShows = await spotifyApiRequest<SpotifyApi.UsersSavedShowsResponse>(fetch, `me/shows?limit=50`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    return {
        shows: likedShows.items.map((show) => show.show),
    };
}) satisfies PageServerLoad;
