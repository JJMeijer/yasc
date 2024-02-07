<script lang="ts">
    import { onMount } from "svelte";
    import Icon from "./Icon.svelte";
    import TrackItemMenuRow from "./TrackItemMenuRow.svelte";

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
</script>

<button on:click={onMenuClick} bind:this={element} class="relative h-full">
    <Icon name="menu" class="h-full w-6 group-hover:text-gray-500 {open ? 'text-gray-500' : 'text-transparent'}" />

    {#if open}
        <div
            class="absolute right-0 z-10 mt-2 flex w-48 cursor-default flex-col rounded-md border border-gray-800/50 bg-gray-900"
        >
            <TrackItemMenuRow>Add To Playlist</TrackItemMenuRow>
            <TrackItemMenuRow>Radio</TrackItemMenuRow>
        </div>
    {/if}
</button>
