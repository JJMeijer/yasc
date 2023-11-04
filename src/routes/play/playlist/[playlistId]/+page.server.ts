import { error } from "@sveltejs/kit";
import NodeCache from "node-cache";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";
import { serverCacheCheckPeriod, serverCacheTtl } from "@constants";

const playlistCache = new NodeCache({ stdTTL: serverCacheTtl, checkperiod: serverCacheCheckPeriod });

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { playlistId } = params;
    const { market = "" } = locals;
    const cacheKey = market + playlistId;

    const cachedPlaylist =
        playlistCache.get<[SpotifyApi.SinglePlaylistResponse, SpotifyApi.PlaylistTrackResponse]>(cacheKey);

    const playlistDataPromise = cachedPlaylist
        ? Promise.resolve(cachedPlaylist[0])
        : getSpotifyRequest<SpotifyApi.SinglePlaylistResponse>(
              fetch,
              locals.accessToken,
              `playlists/${playlistId}?market=from_token&fields=description,images,name,uri`,
          );

    const playlistTracksDataPromise = cachedPlaylist
        ? Promise.resolve(cachedPlaylist[1])
        : getSpotifyRequest<SpotifyApi.PlaylistTrackResponse>(
              fetch,
              locals.accessToken,
              `playlists/${playlistId}/tracks?limit=50&market=from_token&fields=next,items(track(album(name,uri),artists,duration_ms,id,name,uri,linked_from,restrictions,is_playable))`,
              true,
          );

    const [playlistData, playlistTracksData] = await Promise.all([playlistDataPromise, playlistTracksDataPromise]);

    if (!cachedPlaylist && !playlistData.collaborative) {
        playlistCache.set<[SpotifyApi.SinglePlaylistResponse, SpotifyApi.PlaylistTrackResponse]>(cacheKey, [
            playlistData,
            playlistTracksData,
        ]);
    }

    const trackIds = playlistTracksData.items.map((item) => item.track?.id).filter((id) => id) as string[];

    const likesPromises = [];
    for (let i = 0; i < trackIds.length; i += 50) {
        const ids = trackIds.slice(i, i + 50).join(",");
        likesPromises.push(getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/tracks/contains?ids=${ids}`));
    }

    const likes = (await Promise.all(likesPromises)).flat();
    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        playlist: playlistData,
        tracks: playlistTracksData.items,
        likes: likedIds,
    };
}) satisfies PageServerLoad;
