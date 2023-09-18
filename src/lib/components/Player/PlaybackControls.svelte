<script lang="ts">
    import { playerStore, playerStateStore } from "$lib/stores";
    import { Icon } from "$lib/components";

    $: currentTrack = $playerStateStore?.track_window.current_track;
</script>

<div class="contents">
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
</div>
