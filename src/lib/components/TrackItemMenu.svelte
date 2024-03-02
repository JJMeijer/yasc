<script lang="ts">
    import { onMount } from "svelte";

    import TrackItemMenuRow from "./TrackItemMenuRow.svelte";
    import Icon from "./Icon.svelte";

    export let id: string;
    export let open = false;
    let element: HTMLButtonElement;

    const onMenuClick = () => {
        open = !open;
    };

    const handleGlobalClick = (event: MouseEvent) => {
        if (!open) return;

        if (!element.contains(event.target as Node)) {
            open = false;
        }
    };

    onMount(() => {
        document.addEventListener("click", handleGlobalClick);

        return () => {
            document.removeEventListener("click", handleGlobalClick);
        };
    });

    const onQueueClick = async () => {
        await fetch(`/api/queue?uri=spotify:track:${id}`, {
            method: "POST",
        });
    }
</script>

<button on:click={onMenuClick} bind:this={element} class="relative h-full">
    <Icon name="menu" class="h-full w-6 group-hover:text-gray-500 {open ? 'text-gray-500' : 'text-transparent'}" />

    {#if open}
        <div
            class="absolute right-0 z-10 mt-2 flex w-48 cursor-default flex-col rounded-md border border-gray-800/50 bg-gray-900"
        >
            <TrackItemMenuRow>
                <button on:click={onQueueClick} class="contents">
                    <Icon name="add" class="mt-0.5 h-5 w-5 text-gray-500" title="Add to Queue" />
                    <span class="flex-grow text-left">Add to Queue</span>
                </button>
            </TrackItemMenuRow>
            <TrackItemMenuRow>
                <a href={`/play/radio?track=${id}`} class="contents">
                    <Icon name="radio" class="mt-0.5 h-5 w-5 text-gray-500" title="Like" />
                    <span class="flex-grow text-left">Radio</span>
                </a>
            </TrackItemMenuRow>
        </div>
    {/if}
</button>
