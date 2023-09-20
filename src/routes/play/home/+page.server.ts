import { error } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { getSpotifyRequest } from "$lib/server/spotify";

export const load = (async ({ fetch, locals }) => {
    if (!locals.accessToken) {
        throw error(401, "Unauthorized");
    }

    const playlistsPromise = getSpotifyRequest<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `me/playlists?limit=50`,
    );

    const featuredPlaylistsPromise = getSpotifyRequest<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
        fetch,
        locals.accessToken,
        `browse/featured-playlists?limit=5`,
    );

    const [playlists, featuredPlaylists] = await Promise.all([playlistsPromise, featuredPlaylistsPromise]);

    // Fake Playlist item for likes playlist
    playlists.items.unshift({
        collaborative: false,
        href: "",
        type: "playlist",
        owner: {
            display_name: "",
            href: "",
            id: "",
            type: "user",
            uri: "",
            external_urls: {
                spotify: "",
            },
        },
        public: false,
        snapshot_id: "",
        tracks: {
            href: "",
            total: 0,
        },
        external_urls: {
            spotify: "",
        },
        id: "",
        description: "Liked Songs",
        name: "Liked Songs",
        uri: "spotify:library:tracks",
        images: [
            {
                url: "/img/liked-songs-cover.jpg",
            },
        ],
    }) as unknown as SpotifyApi.PlaylistObjectSimplified;

    return {
        playlists: playlists.items,
        featured: featuredPlaylists.playlists.items,
    };
}) satisfies PageServerLoad;
