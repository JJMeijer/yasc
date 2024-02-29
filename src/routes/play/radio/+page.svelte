<script lang="ts">
    import type { PageData } from "./$types";
    import { SpotifyTracksPage, TrackItemList } from "$lib/components";
    import { getImageBySize } from "$lib/utility";
    import TrackItem from "$lib/components/TrackItem.svelte";

    export let data: PageData;
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <p class="text-3xl">{data.seed.name} Radio</p>

        <div class="mx-1 w-full overflow-hidden rounded-md">
            <img
                src={getImageBySize(data.seed.album.images, 300)}
                alt={data.seed.name}
                title={data.seed.name}
                class="h-full w-full select-none object-cover"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <TrackItemList>
            {#each data.tracks as track, index}
                <TrackItem
                    id={track.id}
                    liked={data.likes.includes(track.id)}
                    name={track.name}
                    artists={track.artists}
                    duration_ms={track.duration_ms}
                    album={{
                        name: track.album.name,
                        uri: track.album.uri,
                    }}
                    {index}
                    context={{uris: data.tracks.slice(index).map((track) => track.uri)}}
                    disabledReason={track.restrictions?.reason || ""}
                />
            {/each}
        </TrackItemList>
    </div>
</SpotifyTracksPage>
