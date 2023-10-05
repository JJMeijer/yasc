<script lang="ts">
    import { playerStateStore, playerStore } from "$lib/stores";
    import { durationMsToTime } from "$lib/utility";

    let progressSlider: HTMLDivElement;
    let progressSliderWidth: number;
    let progressSliderStart: number;

    let position = 0;
    let tickTimeout: NodeJS.Timeout;
    let dragging = false;

    $: trackLength = $playerStateStore?.track_window.current_track.duration_ms || 0;
    $: progress = (position / trackLength) * 100;

    $: $playerStateStore?.track_window.current_track && (position = 0);
    $: $playerStateStore?.position && (position = $playerStateStore?.position);
    $: !$playerStateStore?.paused && tick();

    const tick = () => {
        tickTimeout && clearTimeout(tickTimeout);
        if ($playerStateStore?.paused) {
            return;
        }

        if (dragging) {
            tickTimeout = setTimeout(tick, 25);
            return;
        }

        position += 25;

        if (position >= trackLength) {
            return;
        }

        tickTimeout = setTimeout(tick, 25);
    };

    const onProgressSliderClick = (event: MouseEvent) => {
        const { offsetX } = event;
        const newPosition = (offsetX / progressSliderWidth) * trackLength;

        $playerStore?.seek(newPosition);
    };

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const onDragEnd = (event: DragEvent) => {
        dragging = false;
        document.removeEventListener("dragover", onDragOver);

        const { clientX } = event;
        const offsetX = clientX - progressSliderStart;
        const newPosition = (offsetX / progressSliderWidth) * trackLength;

        $playerStore?.seek(newPosition);
    };

    const onDragStart = (event: DragEvent) => {
        dragging = true;

        if (event.dataTransfer) {
            event.dataTransfer.setDragImage(new Image(), 0, 0);
        }

        progressSliderStart = progressSlider.getBoundingClientRect().left;

        document.addEventListener("dragover", onDragOver);
    };

    const onDrag = (event: DragEvent) => {
        if (dragging) {
            const { clientX } = event;
            const offsetX = clientX - progressSliderStart;
            position = (offsetX / progressSliderWidth) * trackLength;
        }
    };
</script>

<div class="flex w-full gap-3 mt-0.5">
    <p class="select-none text-xs">{position ? durationMsToTime(position) : "0:00"}</p>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        bind:this={progressSlider}
        bind:offsetWidth={progressSliderWidth}
        on:click={onProgressSliderClick}
        class="flex min-w-0 flex-grow cursor-pointer items-center"
    >
        <div class="flex h-1 w-full rounded-md bg-gray-800">
            <div
                class="relative flex h-full items-center rounded-md bg-primary"
                style={progress ? `width: ${progress}%` : ""}
            >
                <div
                    draggable="true"
                    on:dragstart={onDragStart}
                    on:dragend={onDragEnd}
                    on:drag={onDrag}
                    class="absolute left-full h-3 w-3 -translate-x-1/2 rounded-full bg-gray-300"
                ></div>
            </div>
        </div>
    </div>
    <p class="select-none text-xs">{trackLength ? durationMsToTime(trackLength) : "-"}</p>
</div>
