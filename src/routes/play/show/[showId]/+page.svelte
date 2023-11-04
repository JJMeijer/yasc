<script lang="ts">
    import { SpotifyTracksPage, EpisodeItemList, EpisodeItem } from "$lib/components";
    import { resolveSpotifyUri } from "$lib/utility";

    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: descriptionParts = data.show.description?.split(/<a href=(.+?)<\/a>/).filter((x: string) => x) || [];
    $: episodes = data.show.episodes.items;
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <p class="text-3xl">{data.show.name}</p>
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
        <div class="w-full m-1 rounded-md overflow-hidden">
            <img
                src={data.show.images[0]?.url}
                alt={data.show.name}
                title={data.show.name}
                class="w-full h-full object-cover select-none"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <EpisodeItemList>
            {#each episodes as episode, index}
                <!-- episode is currently falsely typed, it does contain restrictions  -->
                <EpisodeItem
                    id={episode.id}
                    liked={data.likes.includes(episode.id)}
                    name={episode.name}
                    duration_ms={episode.duration_ms}
                    resumePositionMs={episode.resume_point?.fully_played ? 0 : episode.resume_point?.resume_position_ms || 0}
                    index={index}
                    context={{ uris: episodes.map((episode) => episode.uri).slice(index) }}
                    disabledReason={episode.restrictions?.reason || ""}
                />
            {/each}
        </EpisodeItemList>
    </div>
</SpotifyTracksPage>
