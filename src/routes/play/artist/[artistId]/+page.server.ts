import { error } from "@sveltejs/kit";
import NodeCache from "node-cache";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";
import { serverCacheCheckPeriod, serverCacheTtl } from "@constants";

const artistCache = new NodeCache({ stdTTL: serverCacheTtl, checkperiod: serverCacheCheckPeriod });

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { artistId } = params;
    const { market = "" } = locals;
    const cacheKey = market + artistId;

    const cachedArtist =
        artistCache.get<
            [
                SpotifyApi.ArtistObjectFull,
                SpotifyApi.ArtistsTopTracksResponse,
                SpotifyApi.ArtistsAlbumsResponse,
                SpotifyApi.ArtistsRelatedArtistsResponse,
            ]
        >(cacheKey);

    const artistDataPromise = cachedArtist
        ? Promise.resolve(cachedArtist[0])
        : getSpotifyRequest<SpotifyApi.ArtistObjectFull>(fetch, locals.accessToken, `artists/${artistId}`);

    const artistTopTracksPromise = cachedArtist
        ? Promise.resolve(cachedArtist[1])
        : getSpotifyRequest<SpotifyApi.ArtistsTopTracksResponse>(
              fetch,
              locals.accessToken,
              `artists/${artistId}/top-tracks?market=from_token`,
          );

    const artistAlbumsPromise = cachedArtist
        ? Promise.resolve(cachedArtist[2])
        : getSpotifyRequest<SpotifyApi.ArtistsAlbumsResponse>(
              fetch,
              locals.accessToken,
              `artists/${artistId}/albums?market=from_token&include_groups=album,single,compilation`,
          );

    const relatedArtistsPromise = cachedArtist
        ? Promise.resolve(cachedArtist[3])
        : getSpotifyRequest<SpotifyApi.ArtistsRelatedArtistsResponse>(
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

    if (!cachedArtist) {
        artistCache.set<
            [
                SpotifyApi.ArtistObjectFull,
                SpotifyApi.ArtistsTopTracksResponse,
                SpotifyApi.ArtistsAlbumsResponse,
                SpotifyApi.ArtistsRelatedArtistsResponse,
            ]
        >(cacheKey, [artistData, artistTopTracks, artistAlbums, relatedArtists]);
    }

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
