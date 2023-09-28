export const TOKENS_COOKIE = "tokens";
export const TOKENS_DIVIDER = "---";
export const TOKENS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const SPOTIFY_AUTH_SCOPE = [
    "user-read-private",
    "user-read-email",
    "user-follow-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify",
].join(" ");

export const serverCacheTtl = 1200;
export const serverCacheCheckPeriod = 300;
