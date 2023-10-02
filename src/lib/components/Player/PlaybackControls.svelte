<script lang="ts">
    import { playerStore, playerStateStore, playerDeviceStore } from "$lib/stores";
    import { Icon } from "$lib/components";
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
    }

    const onRepeatClick = () => {
        if (typeof repeatMode === "undefined") {
            return;
        }

        const nextStateMap = {
            0: "context",
            1: "track",
            2: "off",
        } as const

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

<div class="contents">
    <Icon
        onClick={onShuffleClick}
        name="shuffle"
        class="w-6 h-5 mr-1 {currentTrack
            ? `cursor-pointer ${shuffle ? "text-primary/90 hover:text-gray-300" : "text-gray-300 hover:text-primary/90"}`
            : 'text-gray-300/50 cursor-default'}"
    />
    <Icon
        onClick={() => $playerStore?.previousTrack()}
        name="prev"
        class="w-7 h-6 {currentTrack
            ? 'cursor-pointer text-gray-300 hover:text-primary/90'
            : 'text-gray-300/50 cursor-default'}"
    />
    <Icon
        onClick={() => $playerStore?.togglePlay()}
        name={$playerStateStore ? ($playerStateStore.paused ? "play" : "pause") : "play"}
        class="w-10 h-10 {currentTrack
            ? 'cursor-pointer text-gray-300 hover:text-primary/90'
            : 'text-gray-300/50 cursor-default'}"
    />
    <Icon
        onClick={() => $playerStore?.nextTrack()}
        name="next"
        class="w-7 h-6 {currentTrack
            ? 'cursor-pointer text-gray-300 hover:text-primary/90'
            : 'text-gray-300/50 cursor-default'}"
    />
    <Icon
        onClick={onRepeatClick}
        name={repeatMode === 2 ? "repeat-single" : "repeat"}
        class="w-6 h-6 ml-1 {currentTrack && typeof repeatMode !== 'undefined'
            ? `cursor-pointer ${repeatMode ? "text-primary/90 hover:text-gray-300" : "text-gray-300 hover:text-primary/90"}`
            : 'text-gray-300/50 cursor-default'}"
    />
</div>
