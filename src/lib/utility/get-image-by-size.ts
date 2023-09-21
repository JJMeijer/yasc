export const getImageBySize = (images: SpotifyApi.ImageObject[] | Spotify.Album["images"], size: number): string => {
    const sorted = images.sort((a, b) => Math.abs(size - (a.width || 0)) - Math.abs(size - (b.width || 0)));
    return sorted[0]?.url ?? "";
};
