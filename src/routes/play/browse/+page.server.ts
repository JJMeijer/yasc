import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";
import type { CustomCategoryObject } from "@types";

export const load = (async ({ fetch, locals, setHeaders }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const categoriesResponse = await getSpotifyRequest<SpotifyApi.MultipleCategoriesResponse>(
        fetch,
        locals.accessToken,
        "browse/categories?limit=50",
        true,
    );

    const categories: CustomCategoryObject[] = categoriesResponse.categories.items.map((category) => {
        return {
            ...category,
            uri: `spotify:category:${category.id}`,
            images: category.icons,
        } satisfies CustomCategoryObject;
    });

    setHeaders({
        "Cache-Control": "max-age=3600",
    });

    return {
        categories,
    };
}) satisfies PageServerLoad;
