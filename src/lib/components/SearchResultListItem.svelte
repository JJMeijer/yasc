<script lang="ts">
    import { searchStore } from "$lib/stores";
    import { getImageBySize } from "$lib/utility";

    export let href: string;
    export let images: SpotifyApi.ImageObject[];
    export let label: string;
    export let subLabel: string = "";

    const onItemClicked = () => {
        searchStore.set("");
    };
</script>

<a {href} on:click={onItemClicked} class="flex w-full flex-row gap-2 rounded-md p-1 hover:bg-gray-950">
    <div class="h-12 w-12 overflow-hidden rounded-sm">
        <img src={getImageBySize(images, 64)} alt={label} title={label} class="h-full w-full object-cover" />
    </div>
    <div class="flex min-w-0 flex-grow flex-col">
        <p class="truncate text-gray-400">{label}</p>
        {#if subLabel}
            <p class="truncate text-sm text-gray-500">{subLabel}</p>
        {/if}
    </div>
</a>
