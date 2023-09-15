<script lang="ts">
    import { player, playerState } from "$lib/stores";
    import { Icon } from "$lib/components";

    $: currentTrack = $playerState?.track_window.current_track;
</script>

<div class="contents">
    <Icon
        onClick={() => $player?.previousTrack()}
        name="prev"
        class="w-7 h-6 {currentTrack
            ? 'cursor-pointer text-gray-300 hover:text-primary/90'
            : 'text-gray-300/50 cursor-default'}"
    />
    <Icon
        onClick={() => $player?.togglePlay()}
        name={$playerState ? ($playerState.paused ? "play" : "pause") : "play"}
        class="w-10 h-10 {currentTrack
            ? 'cursor-pointer text-gray-300 hover:text-primary/90'
            : 'text-gray-300/50 cursor-default'}"
    />
    <Icon
        onClick={() => $player?.nextTrack()}
        name="next"
        class="w-7 h-6 {currentTrack
            ? 'cursor-pointer text-gray-300 hover:text-primary/90'
            : 'text-gray-300/50 cursor-default'}"
    />
</div>
