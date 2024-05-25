<script lang="ts">
    import { EpisodeItem, EpisodeItemList, SpotifyTracksPage, TrackItem, TrackItemList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: trackQueue = data.queue[0]?.type === "track" ? (data.queue as SpotifyApi.TrackObjectFull[]) : [];
    $: episodeQueue = data.queue[0]?.type === "episode" ? (data.queue as SpotifyApi.EpisodeObjectFull[]) : [];
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <p class="text-3xl">Playback queue</p>
    </div>

    <div slot="tracks" class="contents">
        {#if trackQueue.length > 0}
            <TrackItemList>
                {#each trackQueue as track, index}
                    <TrackItem
                        {track}
                        liked={data.likes.includes(track.id)}
                        album={track.album}
                        {index}
                        context={{ uris: data.queue.slice(index).map((item) => item.uri) }}
                    />
                {/each}
            </TrackItemList>
        {:else}
            <EpisodeItemList>
                {#each episodeQueue as episode, index}
                    <EpisodeItem
                        {index}
                        id={episode.id}
                        liked={data.likes.includes(episode.id)}
                        name={episode.name}
                        duration_ms={episode.duration_ms}
                        fullyPlayed={episode.resume_point?.fully_played || false}
                        resumePositionMs={episode.resume_point?.fully_played
                            ? 0
                            : episode.resume_point?.resume_position_ms || 0}
                        context={{ uris: data.queue.slice(index).map((item) => item.uri) }}
                    />
                {/each}
            </EpisodeItemList>
        {/if}
    </div>
</SpotifyTracksPage>
