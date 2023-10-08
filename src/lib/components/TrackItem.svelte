<script lang="ts">
    import { playerDeviceStore, playerStateStore } from "$lib/stores";
    import { resolveSpotifyUri, durationMsToTime } from "$lib/utility";
    import Like from "./Like.svelte";

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
    export let liked: boolean = false;
    export let disabledReason: string = "";

    const disabledReasonText: Record<string, string> = {
        market: "This track is currently not available in your country",
        product: "You don't have Spotify Premium.",
        explicit: "This track is explicit.",
    };

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

    const onTrackDoubleClick = () => {
        const deviceId = $playerDeviceStore?.device_id;

        if (!deviceId) {
            playerDeviceStore.subscribe((state) => play(state.device_id));
            return;
        }

        play(deviceId);
    };

    $: trackActive = $playerStateStore?.track_window.current_track.id === id;

    $: console.log(disabledReason);
</script>

<div
    tabindex="0"
    role="button"
    on:dblclick={onTrackDoubleClick}
    title={disabledReason ? disabledReasonText[disabledReason] || "" : ""}
    class="flex {disabledReason
        ? 'cursor-not-allowed'
        : 'cursor-default'} flex-row items-center gap-1 rounded-sm border-b border-gray-700/20 p-1 outline-none hover:bg-gray-800/50"
>
    <span class="w-7 {trackActive ? 'text-primary' : disabledReason ? 'text-gray-700' : 'text-gray-500'}">{index + 1}</span>
    <div class="flex flex-grow items-center">
        <div class="flex w-1/2 flex-col gap-0.5 pl-1 pr-4">
            <span class="text-md truncate {trackActive ? 'text-primary' : disabledReason ? 'text-gray-700' : ''}"
                >{name}</span
            >
            <div class="inline-flex flex-wrap">
                {#each artists as artist, index}
                    <a
                        aria-disabled={Boolean(disabledReason)}
                        href={resolveSpotifyUri(artist.uri)}
                        class="text-sm {trackActive
                            ? 'text-primary/50 hover:text-primary/70'
                            : disabledReason
                            ? 'pointer-events-none text-gray-600'
                            : 'text-gray-500 hover:text-gray-400'}">{artist.name}</a
                    >
                    {#if index < artists.length - 1}
                        <span class="text-sm text-gray-500">,&nbsp;</span>
                    {/if}
                {/each}
            </div>
        </div>
        <a
            href={resolveSpotifyUri(album.uri)}
            class="text-sm {trackActive
                ? 'text-primary/50 hover:text-primary/70'
                : disabledReason
                ? ' pointer-events-none text-gray-600'
                : 'text-gray-500 hover:text-gray-400'}">{album.name}</a
        >
    </div>

    <Like trackId={id} {liked} />

    <span class="w-10 text-right {trackActive ? 'text-primary' : disabledReason ? 'text-gray-600' : 'text-gray-500'}">{durationMsToTime(duration_ms)}</span>
</div>
