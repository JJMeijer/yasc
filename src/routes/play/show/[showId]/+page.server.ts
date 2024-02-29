import { error } from "@sveltejs/kit";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { showId } = params;

    const showData = await getSpotifyRequest<SpotifyApi.SingleShowResponse>(
        fetch,
        locals.accessToken,
        `shows/${showId}?market=from_token`,
    );

    const { episodes } = showData;

    if (episodes.next) {
        const showEpisodesData = await getSpotifyRequest<SpotifyApi.ShowEpisodesResponse>(
            fetch,
            locals.accessToken,
            episodes.next.replace("https://api.spotify.com/v1/", ""),
            true,
        );

        showData.episodes.items.push(...showEpisodesData.items);
        showData.episodes.next = null;
    }

    const episodeIds = showData.episodes.items.map((item) => item.id).filter((id) => id) as string[];

    const likesPromises = [];
    for (let i = 0; i < episodeIds.length; i += 50) {
        const ids = episodeIds.slice(i, i + 50).join(",");
        likesPromises.push(getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/episodes/contains?ids=${ids}`));
    }

    const likes = (await Promise.all(likesPromises)).flat();
    const likedIds = episodeIds.filter((_, i) => likes[i]);

    const showLiked = await getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/shows/contains?ids=${showId}`);

    return {
        show: showData,
        likes: likedIds,
        showLiked: showLiked[0] || false,
    };
}) satisfies PageServerLoad;
