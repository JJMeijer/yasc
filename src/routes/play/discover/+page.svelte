<script lang="ts">
    import type { PageData  } from "./$types";
    import { SpotifyTracksPage, TrackItem, TrackItemList } from "$lib/components";

    export let data: PageData;

    $: console.log(data.tracks.slice(0, 4));
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <div class="flex flex-row items-center justify-between pr-1">
            <p class="text-3xl">Discover</p>
        </div>

        <p class="text-gray-500">
            Recommendations based on a random selection of recently played tracks.
        </p>

        <div class="mx-1 w-full overflow-hidden rounded-md flex flex-wrap">
            {#each data.tracks.slice(0, 4) as track}
                <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    title={track.name}
                    class="h-1/2 w-1/2 select-none"
                />
            {/each}
        </div>
    </div>

    <div slot="tracks" class="contents">
        <TrackItemList>
            {#each data.tracks as track, index}
                <TrackItem
                    {track}
                    {index}
                    album={track.album}
                    liked={data.likes.includes(track.id)}
                    context={{ uris: data.tracks.slice(index).map((track) => track.uri) }}
            />
        {/each}
        </TrackItemList>
    </div>
</SpotifyTracksPage>
