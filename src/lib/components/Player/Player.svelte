<script lang="ts">
    import { onMount } from "svelte";

    import { player, playerReady, playerState, token } from "$lib/stores";
    import VolumeSlider from "./VolumeSlider.svelte";
    import PlaybackControls from "./PlaybackControls.svelte";
    import TrackInfo from "./TrackInfo.svelte";

    onMount(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            player.set(
                new Spotify.Player({
                    name: "YASC",
                    getOAuthToken: (cb) => cb($token),
                    volume: 0.5,
                }),
            );

            $player?.addListener("ready", ({ device_id }) => {
                playerReady.set({
                    ready: true,
                    device_id,
                });
            });

            $player?.addListener("not_ready", ({ device_id }) => {
                playerReady.set({
                    ready: false,
                    device_id,
                });
            });

            $player?.addListener("initialization_error", ({ message }) => {
                console.error(message);
            });

            $player?.addListener("authentication_error", ({ message }) => {
                console.error(message);
            });

            $player?.addListener("account_error", ({ message }) => {
                console.error(message);
            });

            $player?.addListener("playback_error", ({ message }) => {
                console.error(message);
            });

            $player?.addListener("player_state_changed", (state) => {
                playerState.set(state);
            });

            $player?.connect();
            $player?.activateElement();
        };

        if (!document.getElementById("spotify-player")) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.id = "spotify-player";
            script.async = true;
            document.body.appendChild(script);
        }

        const spaceBarHandler = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                $player?.togglePlay();
            }
        };

        window.addEventListener("keydown", spaceBarHandler);

        return () => {
            window.removeEventListener("keydown", spaceBarHandler);
        };
    });
</script>


<div class="min-h-[4.5rem] h-[4.5rem] border-primary border-t-2 flex flex-row items-center">
    <div class="flex h-full flex-row items-center gap-6 w-1/3">
        <TrackInfo />
    </div>
    <div class="flex flex-row gap-3 w-1/3 justify-center items-center">
        <PlaybackControls />
    </div>
    <div class="flex flex-row justify-end w-1/3 gap-2 items-center pr-4">
        <VolumeSlider />
    </div>
</div>
