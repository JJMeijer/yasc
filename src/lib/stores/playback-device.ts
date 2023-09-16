import { writable } from "svelte/store";

interface PlaybackDevice {
    devices: SpotifyApi.UserDevice[];
    activeDeviceId: string;
}

export const playbackDevice = writable<PlaybackDevice>({
    devices: [],
    activeDeviceId: "",
});
