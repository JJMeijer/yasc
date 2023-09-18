import { writable } from "svelte/store";

interface PlayerDeviceStore {
    ready: boolean;
    device_id: string;
}

export const playerDeviceStore = writable<PlayerDeviceStore>({
    ready: false,
    device_id: "",
});
