<script lang="ts">
    import { getContext, onMount } from "svelte";

    import TrackItemMenuRow from "./TrackItemMenuRow.svelte";
    import TrackItemMenuText from "./TrackItemMenuText.svelte";
    import Icon from "./Icon.svelte";
    import { addMessage, userOwnedPlaylistsStore } from "$lib/stores";
    import { getImageBySize } from "$lib/utility";
    import { invalidateAll } from "$app/navigation";
    import { fly } from "svelte/transition";

    export let track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified | SpotifyApi.RecommendationTrackObject;
    export let album: SpotifyApi.AlbumObjectSimplified;
    export let open = false;
    export let playlistOpen = false;

    $: playlist = getContext<SpotifyApi.SinglePlaylistResponse>("playlist");
    $: ownedPlaylistId = playlist?.id && $userOwnedPlaylistsStore.find((p) => p.id === playlist.id) ? playlist.id : "";
    $: snapshotId = playlist?.snapshot_id;

    let element: HTMLButtonElement;

    const onMenuClick = () => {
        open = !open;
        if (playlistOpen) playlistOpen = false;
    };

    const onAddPlaylistClick = (event: MouseEvent) => {
        event.stopPropagation();
        playlistOpen = !playlistOpen;
        if (!playlistOpen) open = false;
    };

    const handleGlobalClick = (event: MouseEvent) => {
        if (!open) return;

        if (!element.contains(event.target as Node)) {
            open = false;
            playlistOpen = false;
        }
    };

    onMount(() => {
        document.addEventListener("click", handleGlobalClick);

        return () => {
            document.removeEventListener("click", handleGlobalClick);
        };
    });

    const onQueueClick = async () => {
        await fetch(`/api/queue?uri=spotify:track:${track.id}`, {
            method: "POST",
        });
    };

    const onPlaylistClick = async (playlist: SpotifyApi.PlaylistObjectSimplified) => {
        const payload = {
            playlistId: playlist.id,
            uris: [`spotify:track:${track.id}`],
        };

        const res = await fetch("/api/playlist/tracks/append", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            addMessage({
                type: "success",
                img: getImageBySize(album.images, 64),
                content: "Added to playlist.",
            });
        }
    };

    const onRemoveClick = async () => {
        if (!ownedPlaylistId) {
            return;
        }

        const payload = {
            playlistId: ownedPlaylistId,
            uris: [`spotify:track:${track.id}`],
            snapshotId,
        };

        const res = await fetch(`/api/playlist/tracks/delete`, {
            method: "DELETE",
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            addMessage({
                type: "success",
                img: getImageBySize(album.images, 64),
                content: "Removed from playlist.",
            });

            invalidateAll();
        }
    };
</script>

<button on:click={onMenuClick} bind:this={element} class="relative h-full">
    <Icon name="menu" class="h-full w-6 group-hover:text-gray-500 {open ? 'text-gray-500' : 'text-transparent'}" />

    {#if open}
        <div
            class="absolute z-10 flex w-48 -translate-x-[calc(100%-1.5rem)] transform cursor-default flex-col rounded-md border border-gray-700/50 bg-gray-800"
        >
            <TrackItemMenuRow>
                <button on:click={onAddPlaylistClick} class="relative contents">
                    <Icon name="arrow-left" class="mt-0.5 h-5 w-5 text-gray-500" title="Add to Playlist" />
                    <TrackItemMenuText>Add to Playlist</TrackItemMenuText>
                    {#if playlistOpen}
                        <div
                            transition:fly
                            class="custom-scrollbar absolute right-[103%] top-0 z-20 flex max-h-72 w-52 flex-col gap-0.5 overflow-y-auto rounded-md border border-gray-700/50 bg-gray-800"
                        >
                            {#each $userOwnedPlaylistsStore as playlist}
                                <TrackItemMenuRow>
                                    <button class="contents" on:click={() => onPlaylistClick(playlist)}>
                                        <img
                                            src={playlist.images[0]?.url}
                                            alt={playlist.name}
                                            title={playlist.name}
                                            class="h-8 w-8 select-none rounded-full object-cover"
                                        />
                                        <TrackItemMenuText>{playlist.name}</TrackItemMenuText>
                                    </button>
                                </TrackItemMenuRow>
                            {/each}
                            <!-- <TrackItemMenuRow>
                            <Icon name="add" class="mt-0.5 h-5 w-5 text-gray-500" title="Create New Playlist" />
                            <TrackItemMenuText>Create New Playlist</TrackItemMenuText>
                        </TrackItemMenuRow> -->
                        </div>
                    {/if}
                </button>
            </TrackItemMenuRow>
            {#if ownedPlaylistId}
                <TrackItemMenuRow>
                    <button on:click={onRemoveClick} class="contents">
                        <Icon name="delete" class="mt-0.5 h-5 w-5 text-gray-500" title="Remove from Playlist" />
                        <TrackItemMenuText>Remove</TrackItemMenuText>
                    </button>
                </TrackItemMenuRow>
            {/if}
            <TrackItemMenuRow>
                <button on:click={onQueueClick} class="contents">
                    <Icon name="add-to-queue" class="mt-0.5 h-5 w-5 text-gray-500" title="Add to Queue" />
                    <TrackItemMenuText>Add to Queue</TrackItemMenuText>
                </button>
            </TrackItemMenuRow>
            <TrackItemMenuRow>
                <a href={`/play/radio?track=${track.id}`} class="contents">
                    <Icon name="radio" class="mt-0.5 h-5 w-5 text-gray-500" title="Like" />
                    <TrackItemMenuText>Radio</TrackItemMenuText>
                </a>
            </TrackItemMenuRow>
        </div>
    {/if}
</button>
