import { error } from "@sveltejs/kit";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { artistId } = params;

    const artistDataPromise = getSpotifyRequest<SpotifyApi.ArtistObjectFull>(
        fetch,
        locals.accessToken,
        `artists/${artistId}`,
    );

    const artistTopTracksPromise = getSpotifyRequest<SpotifyApi.ArtistsTopTracksResponse>(
        fetch,
        locals.accessToken,
        `artists/${artistId}/top-tracks?market=from_token`,
    );

    const artistAlbumsPromise = getSpotifyRequest<SpotifyApi.ArtistsAlbumsResponse>(
        fetch,
        locals.accessToken,
        `artists/${artistId}/albums?market=from_token&include_groups=album,single,compilation`,
    );

    const relatedArtistsPromise = getSpotifyRequest<SpotifyApi.ArtistsRelatedArtistsResponse>(
        fetch,
        locals.accessToken,
        `artists/${artistId}/related-artists`,
    );

    const [artistData, artistTopTracks, artistAlbums, relatedArtists] = await Promise.all([
        artistDataPromise,
        artistTopTracksPromise,
        artistAlbumsPromise,
        relatedArtistsPromise,
    ]);

    const trackIds = artistTopTracks.tracks.map((item) => item.id).filter((id) => id) as string[];
    const likes = await getSpotifyRequest<boolean[]>(
        fetch,
        locals.accessToken,
        `me/tracks/contains?ids=${trackIds.join(",")}`,
    );

    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        artist: artistData,
        topTracks: artistTopTracks.tracks,
        albums: artistAlbums.items,
        relatedArtists: relatedArtists.artists,
        likes: likedIds,
    };
}) satisfies PageServerLoad;
