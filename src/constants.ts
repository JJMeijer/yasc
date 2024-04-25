export const TOKENS_COOKIE = "tokens";
export const TOKENS_DIVIDER = "---";
export const TOKENS_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const SPOTIFY_AUTH_SCOPE = [
    "playlist-modify-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "playlist-read-private",
    "streaming",
    "user-follow-read",
    "user-follow-modify",
    "user-library-modify",
    "user-library-read",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-email",
    "user-read-playback-position",
    "user-read-playback-state",
    "user-read-private",
].join(" ");
