import type { Cookies } from "@sveltejs/kit";

import { TOKENS_COOKIE, TOKENS_COOKIE_MAX_AGE, TOKENS_DIVIDER } from "@constants";

export const setTokensCookie = (cookies: Cookies, accessToken: string, refreshToken: string, expiresIn: number): void => {
    const expiry = new Date().getTime() + expiresIn * 1000;

    cookies.set(TOKENS_COOKIE, [accessToken, refreshToken, expiry].join(TOKENS_DIVIDER), {
        path: "/",
        maxAge: TOKENS_COOKIE_MAX_AGE,
        sameSite: "strict",
        httpOnly: true,
        secure: true,
    });
};
