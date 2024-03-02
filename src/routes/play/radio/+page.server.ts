import type { PageServerLoad } from "./$types";
import { spotifyApiRequest } from "$lib/server/spotify";
import { error } from "@sveltejs/kit";

export const load = (async ({ locals, url, fetch }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const seedId = url.searchParams.get("track");

    if (!seedId) {
        throw error(400, "Bad Request");
    }

    const { market = "" } = locals;

    const recommendationsPromise = spotifyApiRequest<SpotifyApi.RecommendationsFromSeedsResponse>(
        fetch,
        `recommendations?market=${market}&limit=49&seed_tracks=${seedId}`,
        {
            method: "GET",
            accessToken: locals.accessToken,
        },
    );

    const seedPromise = spotifyApiRequest<SpotifyApi.TrackObjectFull>(fetch, `tracks/${seedId}?market=${market}`, {
        method: "GET",
        accessToken: locals.accessToken,
    });

    const [recommendations, seed] = await Promise.all([recommendationsPromise, seedPromise]);

    const { tracks } = recommendations;

    const trackIds = [seed.id, ...tracks.map((track) => track.id)];

    const promises = [];

    for (let i = 0; i < trackIds.length; i += 50) {
        const ids = trackIds.slice(i, i + 50).join(",");
        promises.push(
            spotifyApiRequest<boolean[]>(fetch, `me/tracks/contains?ids=${ids}`, {
                method: "GET",
                accessToken: locals.accessToken,
            }),
        );
    }

    const likes = (await Promise.all(promises)).flat();
    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        seed,
        tracks: [seed, ...tracks],
        likes: likedIds,
    };
}) satisfies PageServerLoad;
