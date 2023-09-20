<script lang="ts">
    import { SpotifyTracksPage, TrackItem } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

</script>
<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <p class="text-3xl">Playback queue</p>
    </div>

    <div slot="tracks" class="contents">
        {#each data.queue as track, index}
            <TrackItem {track} {index} uris={data.queue.slice(index).map(item => item.uri)} />
        {/each}
    </div>
</SpotifyTracksPage>
