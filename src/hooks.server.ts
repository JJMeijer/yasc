import type { Handle, HandleFetch } from "@sveltejs/kit";
import { Buffer } from "node:buffer";

import { TOKENS_COOKIE, TOKENS_DIVIDER } from "@constants";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";
import type { SpotifyAuthRefreshResponse } from "@types";
import { log, setAuthCookie } from "$lib/server/utility";
import { spotifyApiRequest } from "$lib/server/spotify";

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

    const [accessToken, refreshToken, expiry, username, id, country] = tokens.split(TOKENS_DIVIDER);

    if (!accessToken || !refreshToken || !expiry || !username || !id || !country) {
        log("error", "Invalid tokens cookie");
        event.cookies.delete(TOKENS_COOKIE, { path: "/" });
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

        const me = await spotifyApiRequest<SpotifyApi.UserObjectPrivate>(event.fetch, "me", {
            method: "GET",
            accessToken: data.access_token,
        });

        const username = me.display_name || me.id;
        setAuthCookie(event.cookies, data.access_token, refreshToken, data.expires_in, username, me.id, me.country);

        event.locals.accessToken = data.access_token;
        event.locals.username = username;
        event.locals.userId = me.id;
        event.locals.market = me.country;
        return await resolveWithLog();
    }

    event.locals.market = country;
    event.locals.accessToken = accessToken;
    event.locals.username = username;
    event.locals.userId = id;

    return await resolveWithLog();
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
    const start = Date.now();
    const res = await fetch(request);
    const end = Date.now();
    const url = new URL(request.url);

    // Simple fetch Logging
    log("fetch", `${request.method} ${res.status} ${url.protocol}//${url.host}${url.pathname} -- ${end - start}ms`);

    return res;
};
