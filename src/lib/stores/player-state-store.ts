import { writable } from "svelte/store";

export const playerStateStore = writable<Spotify.PlaybackState | null>(null);
