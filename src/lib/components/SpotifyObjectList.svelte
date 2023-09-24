<script lang="ts">
    import { getImageBySize, resolveSpotifyUri } from "$lib/utility";

    export let title: string;
    export let items:
        | SpotifyApi.AlbumObjectSimplified[]
        | SpotifyApi.PlaylistObjectSimplified[]
        | SpotifyApi.ArtistObjectFull[];
</script>

<div class="flex flex-col gap-2">
    <p class="text-2xl">{title}</p>
    <div class="flex flex-row gap-8 flex-wrap">
        {#each items as item}
            <a
                href={resolveSpotifyUri(item.uri)}
                class="relative w-44 rounded-md overflow-hidden cursor-pointer bg-gray-900 hover:after:bg-gray-100/10 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-transparent"
            >
                <img
                    src={getImageBySize(item.images, 300)}
                    alt={item.name}
                    title={item.name}
                    class="w-44 h-44 object-cover select-none"
                />
                <div class="h-12 flex items-center p-2">
                    <span class="text-gray-400">{item.name}</span>
                </div>
            </a>
        {/each}
    </div>
</div>
