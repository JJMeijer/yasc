import { writable } from "svelte/store";

interface PlayerReadyStore {
    ready: boolean;
    device_id: string;
}

export const playerReady = writable<PlayerReadyStore>({
    ready: false,
    device_id: "",
});
