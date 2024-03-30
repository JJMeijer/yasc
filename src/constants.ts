export const TOKENS_COOKIE = "tokens";
export const TOKENS_DIVIDER = "---";
export const TOKENS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const SPOTIFY_AUTH_SCOPE = [
    "user-read-private",
    "user-read-email",
    "user-follow-read",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-playback-position",
    "user-read-currently-playing",
    "user-library-read",
    "user-library-modify",
].join(" ");
