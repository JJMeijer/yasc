import { TOKENS_COOKIE } from "@constants";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ cookies }) => {
    cookies.delete(TOKENS_COOKIE, { path: "/" });
    throw redirect(302, "/");
}) satisfies PageServerLoad;
