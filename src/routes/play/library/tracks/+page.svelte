<script lang="ts">
    import { SpotifyTracksPage, TrackItem, TrackItemList } from "$lib/components";

    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <p class="text-3xl">Liked Tracks</p>
        <div class="h-72 w-72 overflow-hidden rounded-md">
            <img
                src="/img/liked-songs-cover.jpg"
                alt="Liked Tracks"
                title="Liked Tracks"
                class="h-full w-full select-none object-cover"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <TrackItemList>
            {#each data.tracks as item, index}
                {#if item.track}
                    <TrackItem
                        track={item.track}
                        {index}
                        liked={true}
                        album={item.track.album}
                        context={{ uris: data.tracks.slice(index).map((item) => item.track.uri) }}
                    />
                {/if}
            {/each}
        </TrackItemList>
    </div>
</SpotifyTracksPage>
