import { error, redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from "$env/static/private";
import type { SpotifyAuthCodeResponse } from "@types";

export const load = (async ({ cookies, url }) => {
    const state = url.searchParams.get("state");

    if (!state) {
        throw error(400, "Bad Request");
    }

    const spotifyAuthState = cookies.get("spotify_auth_state");

    if (state !== spotifyAuthState) {
        throw error(403, "Forbidden");
    }

    const errorParam = url.searchParams.get("error");

    if (errorParam) {
        throw error(403, errorParam);
    }

    const code = url.searchParams.get("code");
    if (!code) {
        throw error(400, "Bad Request");
    }

    cookies.delete("spotify_auth_state");

    const grantType = "authorization_code";
    const redirectUri = SPOTIFY_REDIRECT_URI;

    const authorization = `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`;

    const res = await fetch("https://accounts.spotify.com/api/token", {
        body: new URLSearchParams({
            grant_type: grantType,
            code,
            redirect_uri: redirectUri,
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: authorization,
        },
        method: "POST",
    });

    if (!res.ok) {
        throw error(res.status, res.statusText);
    }

    const data = (await res.json()) as SpotifyAuthCodeResponse;

    cookies.set("tokens", `${data.access_token}:${data.refresh_token}`, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "strict",
        httpOnly: true,
        secure: true,
    });

    throw redirect(302, "/");
}) satisfies PageServerLoad;
