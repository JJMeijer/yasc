export const resolveSpotifyUri = (uri: string | undefined): string => {
    if (!uri) {
        return "";
    }

    const [, type, id] = uri.split(":");
    return `/play/${type}/${id}`;
};
