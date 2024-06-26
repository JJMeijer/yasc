<script lang="ts">
    import { playerStore } from "$lib/stores";
    import { Icon } from "$lib/components";

    let previousVolume = 0.5;
    let volume = 0.5;
    let muted = false;
    let dragging = false;

    $playerStore?.getVolume().then((v) => {
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
            volume = previousVolume;
            $playerStore?.setVolume(volume);
            muted = false;
        } else {
            previousVolume = volume;
            volume = 0;
            $playerStore?.setVolume(volume);
            muted = true;
        }
    };

    let volumeSliderWidth: number;
    let volumeSlider: HTMLDivElement;
    let volumeSliderStart: number;

    const onVolumeSliderClick = (event: MouseEvent) => {
        const { offsetX } = event;
        volume = offsetX / volumeSliderWidth;
        $playerStore?.setVolume(volume);
    };

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
    };

    const onDragEnd = (_event: DragEvent) => {
        dragging = false;
        document.removeEventListener("dragover", onDragOver);
    };

    const onDragStart = (event: DragEvent) => {
        dragging = true;

        if (event.dataTransfer) {
            event.dataTransfer.setDragImage(new Image(), 0, 0);
        }

        volumeSliderStart = volumeSlider.getBoundingClientRect().left;

        document.addEventListener("dragover", onDragOver);
    };

    const onDrag = (event: DragEvent) => {
        if (dragging) {
            const { clientX } = event;
            const offsetX = clientX - volumeSliderStart;
            volume = offsetX / volumeSliderWidth;

            if (volume < 0) {
                volume = 0;
            } else if (volume > 1) {
                volume = 1;
            }

            $playerStore?.setVolume(volume);
        }
    };
</script>

<div class="contents">
    <a href="/play/queue">
        <Icon name="queue" class="h-6 w-6 cursor-pointer text-gray-400 hover:text-primary" />
    </a>
    <div class="ml-2 flex items-center gap-2">
        <Icon
            onClick={onVolumeIconClick}
            name={volumeIcon}
            class="h-6 w-6 cursor-pointer text-gray-400 hover:text-primary"
        />

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            bind:this={volumeSlider}
            bind:offsetWidth={volumeSliderWidth}
            on:click={onVolumeSliderClick}
            class="flex h-3 w-24 cursor-pointer items-center"
        >
            <div class="flex h-1 w-full rounded-md bg-gray-700">
                <div class="relative flex h-full items-center rounded-md bg-primary" style={`width: ${volume * 100}%`}>
                    <div
                        draggable={true}
                        on:dragend={onDragEnd}
                        on:dragstart={onDragStart}
                        on:drag={onDrag}
                        class="absolute left-full h-3 w-3 -translate-x-1/2 rounded-full bg-gray-300"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</div>
