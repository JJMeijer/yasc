import type { Handle, HandleFetch } from "@sveltejs/kit";

import { TOKENS_COOKIE, TOKENS_DIVIDER } from "@constants";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";
import type { SpotifyAuthRefreshResponse } from "@types";
import { log, setAuthCookie } from "$lib/server/utility";
import { getSpotifyRequest } from "$lib/server/spotify";

export const handle: Handle = async ({ event, resolve }) => {
    const resolveWithLog = async () => {
        const start = Date.now();
        const res = await resolve(event);
        const end = Date.now();

        // Simple request Logging
        log("request", `${event.request.method} ${res.status} ${event.route.id} -- ${end - start}ms`);

        return res;
    };

    const tokens = event.cookies.get(TOKENS_COOKIE);

    if (!tokens) {
        return await resolveWithLog();
    }

    const [accessToken, refreshToken, expiry, username] = tokens.split(TOKENS_DIVIDER);

    if (!accessToken || !refreshToken || !expiry || !username) {
        log("error", "Invalid tokens cookie");
        return await resolveWithLog();
    }

    if (new Date().getTime() > Number(expiry)) {
        const res = await event.fetch("https://accounts.spotify.com/api/token", {
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
            },
            method: "POST",
        });

        if (!res.ok) {
            log("error", "Failed to refresh token");
            return await resolveWithLog();
        }

        const data = (await res.json()) as SpotifyAuthRefreshResponse;

        const me = await getSpotifyRequest<SpotifyApi.UserObjectPrivate>(event.fetch, data.access_token, "me");
        const username = me.display_name || me.id;
        setAuthCookie(event.cookies, data.access_token, refreshToken, data.expires_in, username);

        event.locals.accessToken = data.access_token;
        event.locals.username = username;
        return await resolveWithLog();
    }

    event.locals.accessToken = accessToken;
    event.locals.username = username;

    return await resolveWithLog();
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
    const start = Date.now();
    const res = await fetch(request);
    const end = Date.now();

    // Simple fetch Logging
    log("fetch", `${request.method} ${res.status} ${request.url} -- ${end - start}ms`);

    return res;
};
