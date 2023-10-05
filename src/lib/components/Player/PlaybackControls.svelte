<script lang="ts">
    import { playerStore, playerStateStore, playerDeviceStore } from "$lib/stores";
    import { Icon } from "$lib/components";
    import ProgressSlider from "./ProgressSlider.svelte";
    import type { RepeatRequestData, ShuffleRequestData } from "@types";

    $: currentTrack = $playerStateStore?.track_window.current_track;
    $: repeatMode = $playerStateStore?.repeat_mode;
    $: shuffle = $playerStateStore?.shuffle;

    const onShuffleClick = () => {
        const payload: ShuffleRequestData = {
            deviceId: $playerDeviceStore?.device_id,
            state: !shuffle,
        };

        fetch("/api/shuffle", {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const onRepeatClick = () => {
        if (typeof repeatMode === "undefined") {
            return;
        }

        const nextStateMap = {
            0: "context",
            1: "track",
            2: "off",
        } as const;

        const state = nextStateMap[repeatMode];

        const payload: RepeatRequestData = {
            deviceId: $playerDeviceStore?.device_id,
            state,
        };

        fetch("/api/repeat", {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

</script>

<div class="flex w-full flex-col items-center">
    <div class="flex w-full flex-row items-center justify-center gap-2">
        <Icon
            onClick={onShuffleClick}
            name="shuffle"
            class="mr-1 h-5 w-6 {currentTrack
                ? `cursor-pointer ${shuffle ? 'text-primary/90 hover:text-gray-300' : 'text-gray-300 hover:text-primary/90'}`
                : 'cursor-default text-gray-300/50'}"
        />
        <Icon
            onClick={() => $playerStore?.previousTrack()}
            name="prev"
            class="h-6 w-7 {currentTrack
                ? 'cursor-pointer text-gray-300 hover:text-primary/90'
                : 'cursor-default text-gray-300/50'}"
        />
        <Icon
            onClick={() => $playerStore?.togglePlay()}
            name={$playerStateStore ? ($playerStateStore.paused ? "play" : "pause") : "play"}
            class="h-10 w-10 {currentTrack
                ? 'cursor-pointer text-gray-300 hover:text-primary/90'
                : 'cursor-default text-gray-300/50'}"
        />
        <Icon
            onClick={() => $playerStore?.nextTrack()}
            name="next"
            class="h-6 w-7 {currentTrack
                ? 'cursor-pointer text-gray-300 hover:text-primary/90'
                : 'cursor-default text-gray-300/50'}"
        />
        <Icon
            onClick={onRepeatClick}
            name={repeatMode === 2 ? "repeat-single" : "repeat"}
            class="ml-1 h-6 w-6 {currentTrack && typeof repeatMode !== 'undefined'
                ? `cursor-pointer ${
                      repeatMode ? 'text-primary/90 hover:text-gray-300' : 'text-gray-300 hover:text-primary/90'
                  }`
                : 'cursor-default text-gray-300/50'}"
        />
    </div>
    <div class="w-3/4">
        <ProgressSlider />
    </div>
</div>
