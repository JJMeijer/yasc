import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    if (!locals.accessToken) {
        throw redirect(302, "/login");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
    }

    return {
        username: locals.username,
    };
}) satisfies LayoutServerLoad;
