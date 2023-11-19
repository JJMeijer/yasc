import type { Handle, HandleFetch, HandleServerError } from "@sveltejs/kit";
import * as Sentry from "@sentry/node";
import { Buffer } from "buffer";

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

    const [accessToken, refreshToken, expiry, username, country] = tokens.split(TOKENS_DIVIDER);

    if (!accessToken || !refreshToken || !expiry || !username || !country) {
        log("error", "Invalid tokens cookie");
        return await resolveWithLog();
    }

    if (new Date().getTime() > Number(expiry)) {
        console.log("hi");
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
        setAuthCookie(event.cookies, data.access_token, refreshToken, data.expires_in, username, me.country);

        event.locals.accessToken = data.access_token;
        event.locals.username = username;
        event.locals.market = me.country;
        return await resolveWithLog();
    }

    event.locals.market = country;
    event.locals.accessToken = accessToken;
    event.locals.username = username;

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

Sentry.init({
    dsn: "https://2f1d55642f3141db8a41dc12a31d2981@o4506252803768320.ingest.sentry.io/4506252806848512",
});

export const handleError: HandleServerError = async ({ error, event }) => {
    const errorId = crypto.randomUUID();
    Sentry.captureException(error, { extra: { event, errorId } });
};
