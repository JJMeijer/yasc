import { redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/spotify";
import type { SpotifyUser } from "@types";

export const load = (async ({ locals, fetch }) => {
    if (!locals.accessToken) {
        throw redirect(302, "/");
    }

    const user = await getSpotifyRequest<SpotifyUser>(fetch, locals.accessToken, "me");
    const playlists = await getSpotifyRequest<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `me/playlists`,
    );

    return {
        id: user.id,
        displayName: user.display_name,
        playlists: playlists.items,
    };
}) satisfies LayoutServerLoad;
