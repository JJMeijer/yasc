<script lang="ts">
    import { goto } from "$app/navigation";
    import { SpotifyTracksPage, TrackItemList, TrackItem, Like, Icon, Modal } from "$lib/components";
    import { resolveSpotifyUri } from "$lib/utility";

    import type { PageData } from "./$types";

    let showDeleteModal = false;
    export let data: PageData;

    $: descriptionParts = data.playlist.description?.split(/<a href=(.+?)<\/a>/).filter((x: string) => x) || [];
    $: tracks = data.tracks.map((i) => i.track).filter((t) => t !== null) as SpotifyApi.TrackObjectFull[];

    const onPlaylistDelete = async () => {
        const res = await fetch(`/api/playlist/followers?playlistId=${data.playlist.id}`, {
            method: "DELETE",
        });

        if (res.status === 200) {
            goto("/play/home");
        }
    }
</script>

<Modal bind:show={showDeleteModal}>
    <div class="w-96 rounded-md border-2 border-primary/60 bg-gray-900 text-gray-400 overflow-hidden">
        <div class="flex flex-col">
            <div class="flex flex-row items-center justify-between border-b border-gray-800 px-4 py-3">
                <p class="text-xl font-bold">Delete Playlist?</p>
                <Icon onClick={() => showDeleteModal = false} name="add" title="Close" class="h-5 w-5 rotate-45 text-gray-600 hover:text-gray-400" />
            </div>
            <p class="px-4 py-4">Are you sure you want to delete playlist "{data.playlist.name}"? This cannot be reversed.</p>
            <div class="flex flex-row justify-between">
                <button title="Cancel" class="w-1/2 px-4 py-2.5 text-center text-gray-400 border-t border-gray-800 hover:bg-gray-800" on:click={() => showDeleteModal = false}>
                    Cancel
                </button>
                <button title="Delete" class="w-1/2 px-4 py-2.5 text-center text-red-400 border-t border-gray-800 hover:bg-gray-800" on:click={onPlaylistDelete}>
                    Delete
                </button>
            </div>
        </div>
    </div>
</Modal>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <div class="flex flex-row items-center justify-between pr-1">
            <p class="text-3xl">{data.playlist.name}</p>
            {#if data.playlist.owner.display_name !== data.username}
                <Like itemId={data.playlist.id} type="playlists" liked={data.liked} />
            {:else}
                <Icon onClick={() => showDeleteModal = true} title="Delete Playlist" name="delete" class="h-6 w-6 text-gray-800/80 hover:text-red-800/80" />
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
