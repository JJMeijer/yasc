import { error } from "@sveltejs/kit";

import { getSpotifyRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { playlistId } = params;

    const playlistDataPromise = getSpotifyRequest<SpotifyApi.SinglePlaylistResponse>(
        fetch,
        locals.accessToken,
        `playlists/${playlistId}?market=from_token&fields=description,images,name,uri`,
    );

    const playlistTracksDataPromise = getSpotifyRequest<SpotifyApi.PlaylistTrackResponse>(
        fetch,
        locals.accessToken,
        `playlists/${playlistId}/tracks?limit=50&market=from_token&fields=next,items(track(album(name,uri),artists,duration_ms,id,name,uri,linked_from,restrictions,is_playable))`,
        true,
    );

    const [playlistData, playlistTracksData] = await Promise.all([playlistDataPromise, playlistTracksDataPromise]);

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
