import { writable } from "svelte/store";

export const likedTracksStore = writable<string[]>([]);
