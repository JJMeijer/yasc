import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    if (locals.accessToken) {
        throw redirect(302, "/play/home");
    }

    return null;
}) satisfies PageServerLoad;
