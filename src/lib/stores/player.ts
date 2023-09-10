import { writable } from "svelte/store";

export const player = writable<Spotify.Player | null>(null);
