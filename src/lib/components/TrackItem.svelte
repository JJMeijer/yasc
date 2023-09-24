<script lang="ts">
    import { playbackDeviceStore, playerDeviceStore, playerStateStore, likedTracksStore } from "$lib/stores";
    import { resolveSpotifyUri } from "$lib/utility";
    import Icon from "./Icon.svelte";

    interface TrackContextByOffset {
        contextUri: string;
        offset: string;
    }

    interface TrackContextByUris {
        uris: string[];
    }

    interface TrackAlbum {
        name: string;
        uri: string;
    }

    type TrackContext = TrackContextByOffset | TrackContextByUris;

    export let id: string;
    export let name: string;
    export let artists: SpotifyApi.ArtistObjectSimplified[];
    export let album: TrackAlbum;
    export let context: TrackContext;
    export let duration_ms: number;
    export let index: number;

    const play = (deviceId: string) => {
        fetch("/api/play", {
            method: "PUT",
            body: JSON.stringify({
                deviceId,
                ...context,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const durationMsToTime = (durationMs: number) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = ((durationMs % 60000) / 1000).toFixed(0);

        return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
    };

    const onTrackDoubleClick = () => {
        const deviceId = $playbackDeviceStore.activeDeviceId || $playerDeviceStore?.device_id;

        if (!deviceId) {
            playerDeviceStore.subscribe((state) => play(state.device_id));
            return;
        }

        play(deviceId);
    };

    $: trackActive = $playerStateStore?.track_window.current_track.id === id;
    $: liked = $likedTracksStore.indexOf(id) !== -1;
</script>

<div
    tabindex="0"
    role="button"
    on:dblclick={onTrackDoubleClick}
    class="flex flex-row border-b border-gray-700/20 p-1 hover:bg-gray-800/50 rounded-sm cursor-default items-center gap-1"
>
    <span class="w-7 {trackActive ? 'text-primary' : 'text-gray-500'}">{index + 1}</span>
    <div class="flex flex-grow items-center">
        <div class="flex flex-col px-1 gap-0.5 w-1/2">
            <span class={trackActive ? "text-primary" : ""}>{name}</span>
            <div class="inline-flex">
                {#each artists as artist, index}
                    <a
                        href={resolveSpotifyUri(artist.uri)}
                        class="text-sm {trackActive
                            ? 'text-primary/50 hover:text-primary/70'
                            : 'text-gray-500 hover:text-gray-400'}">{artist.name}</a
                    >
                    {#if index < artists.length - 1}
                        <span class="text-sm text-gray-500">,&nbsp;</span>
                    {/if}
                {/each}
            </div>
        </div>
        <a href={resolveSpotifyUri(album.uri)} class="text-gray-500 hover:text-gray-400 text-sm">{album.name}</a>
    </div>
    <Icon
        name="like"
        class="w-6 h-6 {trackActive ? 'text-primary' : 'text-gray-600'} {liked
            ? 'fill-current'
            : 'text-transparent hover:block hover:fill-current hover:text-primary/90'}"
    />
    <span class="w-10 text-right {trackActive ? 'text-primary' : 'text-gray-500'}"
        >{durationMsToTime(duration_ms)}</span
    >
</div>
