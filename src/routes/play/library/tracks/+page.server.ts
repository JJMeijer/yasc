import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const likedTracks = await spotifyApiRequest<SpotifyApi.UsersSavedTracksResponse>(fetch, "me/tracks?limit=50", {
        method: "GET",
        accessToken: locals.accessToken,
        fetchAll: true,
    });

    return {
        tracks: likedTracks.items,
    };
}) satisfies PageServerLoad;
