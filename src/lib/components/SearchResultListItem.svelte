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

<a href={href} on:click={onItemClicked} class="flex flex-row gap-2 p-1 hover:bg-gray-950 rounded-md">
    <div class="h-12 w-12 rounded-sm overflow-hidden">
        <img src={getImageBySize(images, 64)} alt={label} title={label} class="w-full h-full object-cover" />
    </div>
    <div class="flex flex-col">
        <p class="text-gray-400 truncate">{label}</p>
        {#if subLabel}
            <p class="text-gray-500 text-sm truncate">{subLabel}</p>
        {/if}
    </div>
</a>
