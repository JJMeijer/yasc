<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    import { player, playerReady, playerState, token } from "$lib/stores";
    import Icon from "./Icon.svelte";
    import { resolveSpotifyUri } from "$lib/utility";

    /**
     * Initialization
     */
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

    /**
     * Controls
     */

    $: trackName = $playerState?.track_window.current_track.name;
    $: artists = $playerState?.track_window.current_track.artists || [];
    $: albumImage = $playerState?.track_window.current_track.album.images[0]?.url;
    $: albumLink = resolveSpotifyUri($playerState?.track_window.current_track.album.uri);

    /**
     * Volume
     */
    let volume = 0.5;
    let muted = false;

    $player?.getVolume().then((v) => {
        volume = v;
    });

    const getVolumeIcon = (muted: boolean, volume: number): "muted" | "volume-full" | "volume-half" => {
        if (muted) {
            return "muted";
        } else if (volume > 0.5) {
            return "volume-full";
        } else {
            return "volume-half";
        }
    };

    $: volumeIcon = getVolumeIcon(muted, volume);

    const onVolumeIconClick = () => {
        if (muted) {
            volume = 0.5;
            $player?.setVolume(volume);
            muted = false;
        } else {
            volume = 0;
            $player?.setVolume(volume);
            muted = true;
        }
    };

    let volumeSliderWidth: number;

    const onVolumeSliderClick = (event: MouseEvent) => {
        const { offsetX } = event;
        volume = offsetX / volumeSliderWidth;
        $player?.setVolume(volume);
    }

    $: console.log(muted, volumeIcon);
</script>

<svelte:head>
    <title>YASC - {trackName} - {artists.map((a) => a.name).join(", ")}</title>
</svelte:head>

<div class="min-h-[4.5rem] h-[4.5rem] border-primary border-t-2 flex flex-row items-center pr-8">
    <div class="flex h-full flex-row items-center gap-6 w-1/3">
        <button on:click={() => goto(albumLink)} class="h-full {!albumImage && 'border border-gray-700/50'}">
            {#if albumImage}
                <img src={albumImage} alt="album cover" class="h-full object-cover" />
            {/if}
        </button>
        <div class="flex flex-col">
            <p class="select-none">{trackName || ""}</p>
            <div class="inline-flex">
                {#each artists as artist, index}
                    <a
                        href="/artist/{artist.uri.split(':')[2]}"
                        class="text-sm text-gray-500 hover:text-gray-400 hover:underline underline-offset-2">{artist.name}</a
                    >
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
    <div class="flex flex-row justify-end w-1/3 gap-2 items-center">
        <Icon
            onClick={onVolumeIconClick}
            name={volumeIcon}
            class="w-6 h-6 text-gray-300 cursor-pointer hover:text-primary"
        />

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div bind:offsetWidth={volumeSliderWidth} on:click={onVolumeSliderClick} class="w-20 h-1 flex bg-gray-700 rounded-md cursor-pointer">
            <div class="relative h-full bg-primary flex items-center rounded-md" style={`width: ${volume * 100}%`}>
                <div class="absolute h-2.5 w-2.5 rounded-full left-full bg-gray-300 -translate-x-1/2"></div>
            </div>
        </div>
    </div>
</div>
