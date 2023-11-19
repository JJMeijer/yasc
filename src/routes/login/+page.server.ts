import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { SPOTIFY_AUTH_SCOPE } from "@constants";

export const load = (async ({ locals }) => {
    if (locals.accessToken) {
        throw redirect(302, "/play/home");
    }

    const url = new URL("https://accounts.spotify.com/authorize");
    url.searchParams.set("client_id", SPOTIFY_CLIENT_ID);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", SPOTIFY_AUTH_SCOPE);
    url.searchParams.set("redirect_uri", SPOTIFY_REDIRECT_URI);

    throw redirect(302, url.toString());
}) satisfies PageServerLoad;
