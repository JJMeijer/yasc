<script lang="ts">
    import { playerDeviceStore, playerStateStore } from "$lib/stores";
    import { durationMsToTime } from "$lib/utility";
    import Like from "./Like.svelte";

    interface EpisodeContext {
        uris: string[];
    }

    export let id: string;
    export let name: string;
    export let context: EpisodeContext;
    export let resumePositionMs: number;
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
        console.log(resumePositionMs);

        fetch("/api/play", {
            method: "PUT",
            body: JSON.stringify({
                deviceId,
                ...context,
                position_ms: resumePositionMs,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const onEpisodeDoubleClick = () => {
        const deviceId = $playerDeviceStore?.device_id;

        if (!deviceId) {
            playerDeviceStore.subscribe((state) => play(state.device_id));
            return;
        }

        play(deviceId);
    };

    $: episodeActive = $playerStateStore?.track_window.current_track.id === id;
</script>

<div
    tabindex="0"
    role="button"
    on:dblclick={onEpisodeDoubleClick}
    title={disabledReason ? disabledReasonText[disabledReason] || "" : ""}
    class="flex {disabledReason
        ? 'cursor-not-allowed'
        : 'cursor-default'} flex-row items-center gap-1 rounded-sm border-b border-gray-700/20 p-1 outline-none hover:bg-gray-800/50"
>
    <span class="w-7 {episodeActive ? 'text-primary' : disabledReason ? 'text-gray-700' : 'text-gray-500'}">{index + 1}</span
    >
    <div class="flex flex-grow items-center">
        <span
            class="flex flex-row items-center h-11 w-3/4 pl-1 pr-4 {episodeActive
                ? 'text-primary'
                : disabledReason
                ? 'text-gray-700'
                : ''}"
        >
            {name}
        </span>
    </div>

    <Like trackId={id} {liked} />

    <span class="w-10 text-right {episodeActive ? 'text-primary' : disabledReason ? 'text-gray-600' : 'text-gray-500'}"
        >{durationMsToTime(duration_ms)}</span
    >
</div>