import { error } from "@sveltejs/kit";
import NodeCache from "node-cache";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";
import { serverCacheCheckPeriod, serverCacheTtl } from "@constants";

const categoryCache = new NodeCache({ stdTTL: serverCacheTtl, checkperiod: serverCacheCheckPeriod });

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { categoryId } = params;
    const { market = "" } = locals;
    const cacheKey = market + categoryId;

    const cachedCategory =
        categoryCache.get<[SpotifyApi.SingleCategoryResponse, SpotifyApi.CategoryPlaylistsResponse]>(cacheKey);

    const categoryPromise = cachedCategory
        ? Promise.resolve(cachedCategory[0])
        : getSpotifyRequest<SpotifyApi.SingleCategoryResponse>(fetch, locals.accessToken, `browse/categories/${categoryId}`);

    const categoryPlaylistsPromise = cachedCategory
        ? Promise.resolve(cachedCategory[1])
        : getSpotifyRequest<SpotifyApi.CategoryPlaylistsResponse>(
              fetch,
              locals.accessToken,
              `browse/categories/${categoryId}/playlists?limit=50`,
              true,
          );

    const [categoryResponse, categoryPlaylistsResponse] = await Promise.all([categoryPromise, categoryPlaylistsPromise]);

    if (!cachedCategory) {
        categoryCache.set(cacheKey, [categoryResponse, categoryPlaylistsResponse]);
    }

    return {
        category: categoryResponse,
        // Sometimes there are nulls inside the items array ??
        playlists: categoryPlaylistsResponse.playlists.items.filter((playlist) => playlist),
    };
}) satisfies PageServerLoad;
