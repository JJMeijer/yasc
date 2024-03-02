import { error } from "@sveltejs/kit";

import { spotifyApiRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { showId } = params;

    const showData = await spotifyApiRequest<SpotifyApi.SingleShowResponse>(fetch, `shows/${showId}?market=from_token`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    const { episodes } = showData;

    if (episodes.next) {
        const showEpisodesData = await spotifyApiRequest<SpotifyApi.ShowEpisodesResponse>(
            fetch,
            episodes.next.replace("https://api.spotify.com/v1/", ""),
            {
                method: "GET",
                accessToken: locals.accessToken,
                fetchAll: true,
            },
        );

        showData.episodes.items.push(...showEpisodesData.items);
        showData.episodes.next = null;
    }

    const episodeIds = showData.episodes.items.map((item) => item.id).filter((id) => id) as string[];

    const likesPromises = [];
    for (let i = 0; i < episodeIds.length; i += 50) {
        const ids = episodeIds.slice(i, i + 50).join(",");
        likesPromises.push(
            spotifyApiRequest<boolean[]>(fetch, `me/episodes/contains?ids=${ids}`, {
                method: "GET",
                accessToken: locals.accessToken,
            }),
        );
    }

    const likes = (await Promise.all(likesPromises)).flat();
    const likedIds = episodeIds.filter((_, i) => likes[i]);

    const showLiked = await spotifyApiRequest<boolean[]>(fetch, `me/shows/contains?ids=${showId}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    return {
        show: showData,
        likes: likedIds,
        showLiked: showLiked[0] || false,
    };
}) satisfies PageServerLoad;
