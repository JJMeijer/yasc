<script lang="ts">
    import { playerDeviceStore, playerStateStore } from "$lib/stores";
    import { durationMsToTime } from "$lib/utility";
    import Icon from "./Icon.svelte";
    import Like from "./Like.svelte";

    interface EpisodeContext {
        uris: string[];
    }

    export let id: string;
    export let name: string;
    export let context: EpisodeContext;
    export let resumePositionMs: number;
    export let fullyPlayed: boolean;
    export let duration_ms: number;
    export let index: number;
    export let liked: boolean = false;
    export let disabledReason: string = "";

    const disabledReasonText: Record<string, string> = {
        market: "This track is currently not available in your country",
        product: "You don't have Spotify Premium.",
        explicit: "This track is explicit.",
    };

    const progress = ((resumePositionMs / duration_ms) * 100).toFixed(1);

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
    class="flex relative {disabledReason
        ? 'cursor-not-allowed'
        : 'cursor-default'} flex-row items-center gap-1 rounded-sm border-b border-gray-700/20 p-1 outline-none hover:bg-gray-800/50"
>

    <span class="w-7 {episodeActive ? 'text-primary' : disabledReason ? 'text-gray-700' : 'text-gray-500'}">{index + 1}</span>

    <div class="flex flex-grow items-center">
        <span
            class="flex h-11 w-3/4 flex-row items-center pl-1 pr-4 {episodeActive
                ? 'text-primary'
                : disabledReason
                ? 'text-gray-700'
                : ''}"
        >
            {name}
        </span>
        <span class="w-1/4">
            {#if resumePositionMs > 0}
                <div title="{progress}%" class="relative w-32 bg-gray-800 h-2 rounded-full">
                    <div class="bg-primary/70 rounded-full absolute left-0 h-2" style="width: {progress}%;"></div>
                </div>
            {/if}
            {#if fullyPlayed}
                <Icon class="text-primary/90 w-4 h-4 cursor-default" name="check" title="Played" />
            {/if}
        </span>
    </div>

    <Like type="episodes" itemId={id} {liked} />

    <span class="w-10 text-right {episodeActive ? 'text-primary' : disabledReason ? 'text-gray-600' : 'text-gray-500'}">
        {durationMsToTime(duration_ms)}
    </span>
</div>
