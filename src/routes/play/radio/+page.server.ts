import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";
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

    const recommendationsPromise = getSpotifyRequest<SpotifyApi.RecommendationsFromSeedsResponse>(
        fetch,
        locals.accessToken,
        `recommendations?market=${market}&limit=49&seed_tracks=${seedId}`,
        true,
    );

    const seedPromise = getSpotifyRequest<SpotifyApi.TrackObjectFull>(
        fetch,
        locals.accessToken,
        `tracks/${seedId}?market=${market}`,
    );

    const [recommendations, seed] = await Promise.all([recommendationsPromise, seedPromise]);

    const { tracks } = recommendations;

    const trackIds = [seed.id, ...tracks.map((track) => track.id)];

    const promises = [];

    for (let i = 0; i < trackIds.length; i += 50) {
        const ids = trackIds.slice(i, i + 50).join(",");
        promises.push(getSpotifyRequest<boolean[]>(fetch, locals.accessToken, `me/tracks/contains?ids=${ids}`));
    }

    const likes = (await Promise.all(promises)).flat();
    const likedIds = trackIds.filter((_, i) => likes[i]);

    return {
        seed,
        tracks: [seed, ...tracks],
        likes: likedIds,
    };
}) satisfies PageServerLoad;
