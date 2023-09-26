import { getSpotifyRequest } from "$lib/server/spotify";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { categoryId } = params;

    const categoryPromise = getSpotifyRequest<SpotifyApi.SingleCategoryResponse>(
        fetch,
        locals.accessToken,
        `browse/categories/${categoryId}`,
    );

    const categoryPlaylistsPromise = getSpotifyRequest<SpotifyApi.CategoryPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `browse/categories/${categoryId}/playlists?limit=50`,
        true,
    );

    const [categoryResponse, categoryPlaylistsResponse] = await Promise.all([categoryPromise, categoryPlaylistsPromise]);

    return {
        category: categoryResponse,
        playlists: categoryPlaylistsResponse.playlists.items,
    };
}) satisfies PageServerLoad;
