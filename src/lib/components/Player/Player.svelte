<script lang="ts">
    import { onMount } from "svelte";

    import { playerStore, playerDeviceStore, playerStateStore } from "$lib/stores";
    import SoundControl from "./SoundControl.svelte";
    import PlaybackControls from "./PlaybackControls.svelte";
    import TrackInfo from "./TrackInfo.svelte";

    onMount(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            playerStore.set(
                new Spotify.Player({
                    name: "YASC",
                    getOAuthToken: async (cb) => {
                        const res = await fetch("/api/token");
                        const newToken = (await res.json() as { accessToken: string }).accessToken;

                        return cb(newToken)
                    },
                    volume: 0.5,
                }),
            );

            $playerStore?.addListener("ready", ({ device_id }) => {
                playerDeviceStore.set({
                    ready: true,
                    device_id,
                });
            });

            $playerStore?.addListener("not_ready", ({ device_id }) => {
                playerDeviceStore.set({
                    ready: false,
                    device_id,
                });
            });

            $playerStore?.addListener("initialization_error", ({ message }) => {
                console.error(message);
            });

            $playerStore?.addListener("authentication_error", ({ message }) => {
                console.error(message);
            });

            $playerStore?.addListener("account_error", ({ message }) => {
                console.error(message);
            });

            $playerStore?.addListener("playback_error", ({ message }) => {
                console.error(message);
            });

            $playerStore?.addListener("player_state_changed", (state) => {
                playerStateStore.set(state);
            });

            $playerStore?.connect();
            $playerStore?.activateElement();
        };

        if (!document.getElementById("spotify-player")) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.id = "spotify-player";
            script.async = true;
            document.body.appendChild(script);
        }

        // TODO: Only if nothing is focused
        const spaceBarHandler = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                const activeElement = document.activeElement as HTMLElement;

                if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
                    return;
                }

                $playerStore?.togglePlay();
            }
        };

        window.addEventListener("keydown", spaceBarHandler);

        return () => {
            window.removeEventListener("keydown", spaceBarHandler);
        };
    });
</script>


<div class="min-h-[4.5rem] h-[4.5rem] border-primary border-t-2 flex flex-row items-center">
    <div class="flex h-full flex-row items-center gap-6 w-2/5">
        <TrackInfo />
    </div>
    <div class="flex flex-row gap-3 w-1/5 justify-center items-center">
        <PlaybackControls />
    </div>
    <div class="flex flex-row justify-end w-2/5 gap-2 items-center pr-4">
        <SoundControl />
    </div>
</div>
