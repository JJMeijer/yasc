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

    return {
        queue: tracks,
    };
}) satisfies PageServerLoad;
