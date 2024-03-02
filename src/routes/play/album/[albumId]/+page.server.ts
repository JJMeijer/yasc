import { error } from "@sveltejs/kit";

import { spotifyApiRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { albumId } = params;

    const albumData = await spotifyApiRequest<SpotifyApi.AlbumObjectFull>(fetch, `albums/${albumId}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    const trackIds = albumData.tracks.items.map((item) => item.id).filter((id) => id) as string[];

    const likesPromises = [];
    for (let i = 0; i < trackIds.length; i += 50) {
        const ids = trackIds.slice(i, i + 50).join(",");
        likesPromises.push(
            spotifyApiRequest<boolean[]>(fetch, `me/tracks/contains?ids=${ids}`, {
                method: "GET",
                accessToken: locals.accessToken,
            }),
        );
    }

    const likes = (await Promise.all(likesPromises)).flat();
    const likedIds = trackIds.filter((_, i) => likes[i]);

    const albumLiked = await spotifyApiRequest<boolean[]>(fetch, `me/albums/contains?ids=${albumId}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    return {
        album: albumData,
        likes: likedIds,
        albumLiked: albumLiked[0] || false,
    };
}) satisfies PageServerLoad;
