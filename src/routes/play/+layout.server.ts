import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
    }

    const likedTracks = await getSpotifyRequest<SpotifyApi.UsersSavedTracksResponse>(
        fetch,
        locals.accessToken,
        "me/tracks?limit=50",
    );

    return {
        username: locals.username,
        likedTracks: likedTracks.items,
    };
}) satisfies LayoutServerLoad;
