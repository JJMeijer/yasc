import { getSpotifyRequest } from "$lib/spotify";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    if (!locals.username) {
        throw error(500, "Internal Server Error");
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

    const [artistData, artistTopTracks, artistAlbums] = await Promise.all([
        artistDataPromise,
        artistTopTracksPromise,
        artistAlbumsPromise,
    ]);

    return {
        accessToken: locals.accessToken,
        username: locals.username,
        artist: artistData,
        topTracks: artistTopTracks.tracks,
        albums: artistAlbums.items,
    };
}) satisfies PageServerLoad;
