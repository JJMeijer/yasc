import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const queue = await spotifyApiRequest<SpotifyApi.UsersQueueResponse>(fetch, `me/player/queue`, {
        method: "GET",
        accessToken: locals.accessToken,
        fetchAll: true,
    });

    const tracks = queue.queue;
    if (queue.currently_playing) {
        tracks.unshift(queue.currently_playing);
    }

    const trackIds = tracks.map((track) => track.id).filter((id) => id) as string[];

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

    return {
        queue: tracks,
        likes: likedIds,
    };
}) satisfies PageServerLoad;
