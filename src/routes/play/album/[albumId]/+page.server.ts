import { getSpotifyRequest } from "$lib/server/spotify";
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

    const trackIds = albumData.tracks.items.map((item) => item.id).filter((id) => id) as string[];

    const likesPromises = [];
    for (let i = 0; i < trackIds.length; i += 50) {
        const ids = trackIds.slice(i, i + 50).join(",");
        likesPromises.push(getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/tracks/contains?ids=${ids}`));
    }

    const likes = (await Promise.all(likesPromises)).flat();
    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        album: albumData,
        likes: likedIds,
    };
}) satisfies PageServerLoad;
