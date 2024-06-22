import { error } from "@sveltejs/kit";

import { spotifyApiRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { categoryId } = params;

    const categoryPromise = spotifyApiRequest<SpotifyApi.SingleCategoryResponse>(fetch, `browse/categories/${categoryId}`, {
        method: "GET",
        accessToken: locals.accessToken,
        cache: true,
        cacheTime: 60 * 60 * 1000,
    });

    const categoryPlaylistsPromise = spotifyApiRequest<SpotifyApi.CategoryPlaylistsResponse>(
        fetch,
        `browse/categories/${categoryId}/playlists?limit=50`,
        {
            method: "GET",
            accessToken: locals.accessToken,
            fetchAll: true,
            cache: true,
            cacheTime: 60 * 60 * 1000,
        },
    );

    const [categoryResponse, categoryPlaylistsResponse] = await Promise.all([categoryPromise, categoryPlaylistsPromise]);

    return {
        category: categoryResponse,
        // Sometimes there are nulls inside the items array ??
        playlists: categoryPlaylistsResponse.playlists.items.filter((playlist) => playlist),
    };
}) satisfies PageServerLoad;
