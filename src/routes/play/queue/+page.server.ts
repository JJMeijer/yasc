import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const queue = await getSpotifyRequest<SpotifyApi.UsersQueueResponse>(fetch, locals.accessToken, `me/player/queue`, true);

    const tracks = queue.queue;
    if (queue.currently_playing) {
        tracks.unshift(queue.currently_playing);
    }

    return {
        queue: tracks,
    };
}) satisfies PageServerLoad;
