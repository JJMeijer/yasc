import { writable } from "svelte/store";

export const playerStore = writable<Spotify.Player | null>(null);
