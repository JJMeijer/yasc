import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
    }

    return {
        username: locals.username,
    };
}) satisfies LayoutServerLoad;
