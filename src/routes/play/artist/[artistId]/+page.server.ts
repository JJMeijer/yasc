import { error } from "@sveltejs/kit";

import { spotifyApiRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { artistId } = params;

    const artistDataPromise = spotifyApiRequest<SpotifyApi.ArtistObjectFull>(fetch, `artists/${artistId}`, {
        method: "GET",
        accessToken: locals.accessToken,
        cache: true,
        cacheTime: 60 * 60 * 1000,
    });

    const artistTopTracksPromise = spotifyApiRequest<SpotifyApi.ArtistsTopTracksResponse>(
        fetch,
        `artists/${artistId}/top-tracks?market=from_token`,
        {
            method: "GET",
            accessToken: locals.accessToken,
            cache: true,
            cacheTime: 60 * 60 * 1000,
        },
    );

    const artistAlbumsPromise = spotifyApiRequest<SpotifyApi.ArtistsAlbumsResponse>(
        fetch,
        `artists/${artistId}/albums?market=from_token&include_groups=album,single,compilation`,
        {
            method: "GET",
            accessToken: locals.accessToken,
            cache: true,
            cacheTime: 60 * 15 * 1000,
        },
    );

    const relatedArtistsPromise = spotifyApiRequest<SpotifyApi.ArtistsRelatedArtistsResponse>(
        fetch,
        `artists/${artistId}/related-artists`,
        {
            method: "GET",
            accessToken: locals.accessToken,
            cache: true,
            cacheTime: 60 * 60 * 1000,
        },
    );

    const [artistData, artistTopTracks, artistAlbums, relatedArtists] = await Promise.all([
        artistDataPromise,
        artistTopTracksPromise,
        artistAlbumsPromise,
        relatedArtistsPromise,
    ]);

    const trackIds = artistTopTracks.tracks.map((item) => item.id).filter((id) => id) as string[];
    const likes = await spotifyApiRequest<boolean[]>(fetch, `me/tracks/contains?ids=${trackIds.join(",")}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        artist: artistData,
        topTracks: artistTopTracks.tracks,
        albums: artistAlbums.items,
        relatedArtists: relatedArtists.artists,
        likes: likedIds,
    };
}) satisfies PageServerLoad;
