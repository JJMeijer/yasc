<script lang="ts">
    import { TrackItem } from "$lib/components";
    import SpotifyTracksPage from "$lib/components/SpotifyTracksPage.svelte";
    import { resolveSpotifyUri } from "$lib/utility";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <div class="flex flex-col gap-1">
            <p class="text-3xl">{data.album.name}</p>
            <div class="inline-flex">
                {#each data.album.artists as artist, index}
                    <a href={resolveSpotifyUri(artist.uri)} class="text-sm text-gray-500 hover:text-gray-400"
                        >{artist.name}</a
                    >
                    {#if index < data.album.artists.length - 1}
                        <span class="text-sm text-gray-500">,&nbsp;</span>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="w-72 h-72 rounded-sm overflow-hidden">
            <img
                src={data.album.images[0]?.url}
                alt={data.album.name}
                title={data.album.name}
                class="w-full h-full object-cover select-none"
            />
        </div>
        <p class="text-gray-500 text-sm">
            {data.album.album_type} - <span title="Release Date">{data.album.release_date.substring(0, 4)}</span> -
            <span title="Record Label">{data.album.label}</span>
        </p>
    </div>

    <div slot="tracks" class="contents">
        {#each data.album.tracks.items as track, index}
            <TrackItem {track} contextUri={data.album.uri} offset={track.uri} {index} />
        {/each}
    </div>
</SpotifyTracksPage>
