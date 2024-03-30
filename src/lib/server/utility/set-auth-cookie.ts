import type { Cookies } from "@sveltejs/kit";

import { TOKENS_COOKIE, TOKENS_COOKIE_MAX_AGE, TOKENS_DIVIDER } from "@constants";

export const setAuthCookie = (
    cookies: Cookies,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    username: string,
    id: string,
    country: string,
): void => {
    const expiry = new Date().getTime() + expiresIn * 1000;

    cookies.set(TOKENS_COOKIE, [accessToken, refreshToken, expiry, username, id, country].join(TOKENS_DIVIDER), {
        path: "/",
        maxAge: TOKENS_COOKIE_MAX_AGE,
        sameSite: "lax",
        httpOnly: true,
        secure: true,
    });
};
