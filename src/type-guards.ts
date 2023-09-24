const isSpotifyContextObject = (obj: unknown): obj is SpotifyApi.ContextObject => {
    if (!obj) return false;
    if (typeof obj !== "object") return false;
    if (!(obj as SpotifyApi.ContextObject).external_urls) return false;
    if (!(obj as SpotifyApi.ContextObject).type) return false;

    return true;
};

export const isAlbumObjectSimplified = (obj: unknown): obj is SpotifyApi.AlbumObjectSimplified => {
    if (!isSpotifyContextObject(obj)) return false;
    if (obj.type !== "album") return false;

    return true;
};

export const isArtistObjectFull = (obj: unknown): obj is SpotifyApi.ArtistObjectFull => {
    if (!isSpotifyContextObject(obj)) return false;
    if (obj.type !== "artist") return false;
    if (!(obj as SpotifyApi.ArtistObjectFull).followers) return false;

    return true;
};

export const isPlaylistObjectSimplified = (obj: unknown): obj is SpotifyApi.PlaylistObjectSimplified => {
    if (!isSpotifyContextObject(obj)) return false;
    if (obj.type !== "playlist") return false;

    return true;
};
