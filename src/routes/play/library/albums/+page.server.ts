import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const albumsResponse = await getSpotifyRequest<SpotifyApi.UsersSavedAlbumsResponse>(
        fetch,
        locals.accessToken,
        "me/albums?limit=50",
        true,
    );

    return {
        albums: albumsResponse.items.map((item) => item.album),
    };
}) satisfies PageServerLoad;
