import { error } from "@sveltejs/kit";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
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

    const albumLiked = await getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/albums/contains?ids=${albumId}`);

    return {
        album: albumData,
        likes: likedIds,
        albumLiked: albumLiked[0] || false,
    };
}) satisfies PageServerLoad;
