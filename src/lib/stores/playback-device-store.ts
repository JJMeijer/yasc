import { writable } from "svelte/store";

interface PlaybackDeviceStore {
    devices: SpotifyApi.UserDevice[];
    activeDeviceId: string;
}

export const playbackDeviceStore = writable<PlaybackDeviceStore>({
    devices: [],
    activeDeviceId: "",
});
