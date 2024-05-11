import { writable } from "svelte/store";

export const userOwnedPlaylistsStore = writable<SpotifyApi.PlaylistObjectSimplified[]>([]);

export const addUserOwnedPlaylist = (playlist: SpotifyApi.PlaylistObjectSimplified) => {
    userOwnedPlaylistsStore.update((playlists) => [...playlists, playlist]);
};

export const removeUserOwnedPlaylist = (playlistId: string) => {
    userOwnedPlaylistsStore.update((playlists) => playlists.filter((playlist) => playlist.id !== playlistId));
};
