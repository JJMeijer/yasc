import { error } from "@sveltejs/kit";

import { spotifyApiRequest } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { playlistId } = params;

    const playlistDataPromise = spotifyApiRequest<SpotifyApi.SinglePlaylistResponse>(
        fetch,
        `playlists/${playlistId}?market=from_token&fields=description,images,name,uri,followers(total),owner,public,id, snapshot_id`,
        {
            accessToken: locals.accessToken,
            method: "GET",
        },
    );

    const playlistTracksDataPromise = spotifyApiRequest<SpotifyApi.PlaylistTrackResponse>(
        fetch,
        `playlists/${playlistId}/tracks?limit=50&market=from_token&fields=next,items(track(album(name,uri),artists,duration_ms,id,name,uri,linked_from,restrictions,is_playable))`,
        {
            accessToken: locals.accessToken,
            method: "GET",
            fetchAll: true,
        },
    );

    const playlistFollowedPromise = spotifyApiRequest<boolean[]>(
        fetch,
        `playlists/${playlistId}/followers/contains?ids=${locals.userId}`,
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    const [playlistData, playlistTracksData, playlistFollowedData] = await Promise.all([
        playlistDataPromise,
        playlistTracksDataPromise,
        playlistFollowedPromise,
    ]);

    const trackIds = playlistTracksData.items.map((item) => item.track?.id).filter((id) => id) as string[];

    const likesPromises = [];
    for (let i = 0; i < trackIds.length; i += 50) {
        const ids = trackIds.slice(i, i + 50).join(",");
        likesPromises.push(
            spotifyApiRequest<boolean[]>(fetch, `me/tracks/contains?ids=${ids}`, {
                method: "GET",
                accessToken: locals.accessToken,
            }),
        );
    }

    const likes = (await Promise.all(likesPromises)).flat();
    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        playlist: playlistData,
        tracks: playlistTracksData.items,
        likes: likedIds,
        liked: playlistFollowedData[0] || false,
    };
}) satisfies PageServerLoad;
