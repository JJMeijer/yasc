<script lang="ts">
    import { SpotifyTracksPage, TrackItemList, TrackItem, Like, Icon } from "$lib/components";
    import { resolveSpotifyUri } from "$lib/utility";

    import type { PageData } from "./$types";

    export let data: PageData;

    $: descriptionParts = data.playlist.description?.split(/<a href=(.+?)<\/a>/).filter((x: string) => x) || [];
    $: tracks = data.tracks.map((i) => i.track).filter((t) => t !== null) as SpotifyApi.TrackObjectFull[];
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <div class="flex flex-row items-center justify-between pr-1">
            <p class="text-3xl">{data.playlist.name}</p>
            {#if data.playlist.owner.display_name !== data.username}
                <Like itemId={data.playlist.id} type="playlists" liked={data.liked} />
            {:else}
                <Icon title="Delete Playlist" name="delete" class="h-6 w-6 text-gray-800/80 hover:text-red-800/80" />
            {/if}
        </div>
        <p class="text-gray-500">
            {#each descriptionParts as part}
                {#if part.match("spotify:.+")}
                    <a class="text-gray-400 underline-offset-2 hover:underline" href={resolveSpotifyUri(part.split(">")[0])}>
                        {part.split(">")[1]}
                    </a>
                {:else}
                    <!-- This is hilarious & sad at the same time -->
                    <span class={part === ", " ? "-ml-1" : ""}>{part}</span>
                {/if}
            {/each}
        </p>
        <div class="m-1 w-full overflow-hidden rounded-md">
            <img
                src={data.playlist.images[0]?.url}
                alt={data.playlist.name}
                title={data.playlist.name}
                class="h-full w-full select-none object-cover"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <TrackItemList>
            {#each tracks as track, index}
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
                    context={{
                        contextUri: data.playlist.uri,
                        offset: track.linked_from ? track.linked_from.uri : track.uri,
                    }}
                    disabledReason={track.restrictions?.reason || ""}
                />
            {/each}
        </TrackItemList>
    </div>
</SpotifyTracksPage>
