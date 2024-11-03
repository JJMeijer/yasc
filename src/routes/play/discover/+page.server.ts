import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";
import { error } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const { market = "" } = locals;

    const lastPlayedTracks = await spotifyApiRequest<SpotifyApi.UsersRecentlyPlayedTracksResponse>(
        fetch,
        "me/player/recently-played?limit=25",
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    const { items } = lastPlayedTracks;

    const recentTrackIds = items.map((item) => item.track.id);
    const randomTracks = recentTrackIds.sort(() => 0.5 - Math.random()).slice(0, 5);

    const recommendations = await spotifyApiRequest<SpotifyApi.RecommendationsFromSeedsResponse>(
        fetch,
        `recommendations?market=${market}&limit=50&seed_tracks=${randomTracks.join()}`,
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    const { tracks } = recommendations;

    const trackIds = tracks.map((track) => track.id);

    const likes = await spotifyApiRequest<boolean[]>(fetch, `me/tracks/contains?ids=${trackIds.join()}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        tracks,
        likes: likedIds,
    };
}) satisfies PageServerLoad;
