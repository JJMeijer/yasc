import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const albumsResponse = await spotifyApiRequest<SpotifyApi.UsersSavedAlbumsResponse>(fetch, "me/albums?limit=50", {
        method: "GET",
        accessToken: locals.accessToken,
        fetchAll: true,
    });

    return {
        albums: albumsResponse.items.map((item) => item.album),
    };
}) satisfies PageServerLoad;
