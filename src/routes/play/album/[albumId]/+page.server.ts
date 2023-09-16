import { getSpotifyRequest } from "$lib/spotify";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
    }

    const { albumId } = params;

    const albumData = await getSpotifyRequest<SpotifyApi.AlbumObjectFull>(fetch, locals.accessToken, `albums/${albumId}`);

    return {
        accessToken: locals.accessToken,
        username: locals.username,
        album: albumData,
    };
}) satisfies PageServerLoad;
