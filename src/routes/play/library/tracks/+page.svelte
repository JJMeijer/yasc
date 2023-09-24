<script lang="ts">
    import { SpotifyTracksPage, TrackItem, TrackItemList } from "$lib/components";

    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <p class="text-3xl">Liked Tracks</p>
        <div class="w-72 h-72 rounded-md overflow-hidden">
            <img
                src="/img/liked-songs-cover.jpg"
                alt="Liked Tracks"
                title="Liked Tracks"
                class="w-full h-full object-cover select-none"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <TrackItemList>
        {#each data.tracks as item, index}
            {#if item.track}
                <TrackItem {...item.track} {index} context={{ uris: data.tracks.slice(index).map(item => item.track.uri)}} />
            {/if}
        {/each}
        </TrackItemList>
    </div>
</SpotifyTracksPage>
