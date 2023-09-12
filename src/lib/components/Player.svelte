<script lang="ts">
    import { player, playerReady, playerState, token } from "$lib/stores";
    import { onMount } from "svelte";
    import Icon from "./Icon.svelte";

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
                console.log(state);
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

    $: trackName = $playerState?.track_window.current_track.name;
    $: artists = $playerState?.track_window.current_track.artists || [];
    $: albumImage = $playerState?.track_window.current_track.album.images[0]?.url;
</script>

<svelte:head>
    <title>YASC - {$playerState?.track_window.current_track.name}</title>
</svelte:head>

<div class="min-h-[4.5rem] border-primary border-t-2 flex flex-row items-center px-8">
    <div class="flex flex-row items-center gap-4 w-1/3">
        <div class="w-12 h-12 rounded-md overflow-hidden border border-gray-700/50">
            <img
                src={albumImage}
                alt="album cover"
                class="object-cover"
            />
        </div>
        <div class="flex flex-col">
            <p>{trackName}</p>
            <div class="inline-flex">
                {#each artists as artist, index}
                    <a href="/artist/{artist.uri.split(":")[2]}" class="text-sm text-gray-500 hover:text-gray-400 hover:underline underline-offset-2">{artist.name}</a>
                    {#if index < artists.length - 1}
                        <span class="text-sm text-gray-500">,&nbsp;</span>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
    <div class="flex flex-row gap-3 w-1/3 justify-center items-center">
        <Icon
            onClick={() => $player?.previousTrack()}
            name="prev"
            class="w-7 h-6 text-gray-300 cursor-pointer hover:text-primary"
        />
        <Icon
            onClick={() => $player?.togglePlay()}
            name={$playerState ? ($playerState.paused ? "play" : "pause") : "play"}
            class="w-10 h-10 text-gray-300 cursor-pointer hover:text-primary"
        />
        <Icon
            onClick={() => $player?.nextTrack()}
            name="next"
            class="w-7 h-6 text-gray-300 cursor-pointer hover:text-primary"
        />
    </div>
    <div class="flex flex-row justify-end w-1/3">volume</div>
</div>
