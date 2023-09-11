import { writable } from "svelte/store";

export const playerState = writable<Spotify.PlaybackState | null>(null);
