<script lang="ts">
    import { resolveSpotifyUri } from "$lib/utility";

    export let title: string;
    export let items: SpotifyApi.AlbumObjectSimplified[] | SpotifyApi.PlaylistObjectSimplified[] | SpotifyApi.ArtistObjectFull[];
</script>

<div class="flex flex-col gap-2">
    <p class="text-2xl">{title}</p>
    <div class="flex flex-row gap-8 flex-wrap">
        {#each items as item}
            <a
                href={resolveSpotifyUri(item.uri)}
                class="relative w-44 h-44 rounded-md overflow-hidden cursor-pointer hover:after:bg-gray-100/10 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-transparent"
            >
                <img
                    src={item.images[0]?.url}
                    alt={item.name}
                    title={item.name}
                    class="w-full h-full object-cover select-none"
                />
            </a>
        {/each}
    </div>
</div>
