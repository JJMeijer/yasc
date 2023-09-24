<script lang="ts">
    import { SpotifyTracksPage, TrackItemList, TrackItem } from "$lib/components";
    import { resolveSpotifyUri } from "$lib/utility";

    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: descriptionParts = data.playlist.description?.split(/<a href=(.+?)<\/a>/).filter((x: string) => x) || [];
    $: tracks = data.playlist.tracks.items.map((i) => i.track).filter((t) => t !== null) as SpotifyApi.TrackObjectFull[];
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <p class="text-3xl">{data.playlist.name}</p>
        <p class="text-gray-500">
            {#each descriptionParts as part}
                {#if part.match("spotify:.+")}
                    <a class="text-gray-400 hover:underline underline-offset-2" href={resolveSpotifyUri(part.split(">")[0])}>
                        {part.split(">")[1]}
                    </a>
                {:else}
                    <!-- This is hilarious & sad at the same time -->
                    <span class={part === ", " ? "-ml-1" : ""}>{part}</span>
                {/if}
            {/each}
        </p>
        <div class="w-72 h-72 rounded-md overflow-hidden">
            <img
                src={data.playlist.images[0]?.url}
                alt={data.playlist.name}
                title={data.playlist.name}
                class="w-full h-full object-cover select-none"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <TrackItemList>
            {#each tracks as track, index}
                <TrackItem {...track} {index} context={{ contextUri: data.playlist.uri, offset:  track.uri }} />
            {/each}
        </TrackItemList>
    </div>
</SpotifyTracksPage>
