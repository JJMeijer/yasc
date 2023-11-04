import { error } from "@sveltejs/kit";
import NodeCache from "node-cache";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";
import { serverCacheCheckPeriod, serverCacheTtl } from "@constants";

const showCache = new NodeCache({ stdTTL: serverCacheTtl, checkperiod: serverCacheCheckPeriod });

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { showId } = params;
    const { market = "" } = locals;
    const cacheKey = market + showId;

    const cachedShow = showCache.get<SpotifyApi.SingleShowResponse>(cacheKey);

    const showData =
        cachedShow ||
        (await getSpotifyRequest<SpotifyApi.SingleShowResponse>(
            fetch,
            locals.accessToken,
            `shows/${showId}?market=from_token`,
        ));

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

    if (!cachedShow) {
        showCache.set<SpotifyApi.SingleShowResponse>(cacheKey, showData);
    }

    const episodeIds = showData.episodes.items.map((item) => item.id).filter((id) => id) as string[];

    const likesPromises = [];
    for (let i = 0; i < episodeIds.length; i += 50) {
        const ids = episodeIds.slice(i, i + 50).join(",");
        likesPromises.push(getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/episodes/contains?ids=${ids}`));
    }

    const likes = (await Promise.all(likesPromises)).flat();
    const likedIds = episodeIds.filter((_, i) => likes[i]);

    return {
        show: showData,
        likes: likedIds,
    };
}) satisfies PageServerLoad;
