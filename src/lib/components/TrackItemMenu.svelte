<script lang="ts">
    import { onMount } from "svelte";

    import TrackItemMenuRow from "./TrackItemMenuRow.svelte";
    import Icon from "./Icon.svelte";
    // import { userOwnedPlaylistsStore } from "$lib/stores";

    export let id: string;
    export let open = false;
    export let ownedPlaylistId: string = "";
    export let snapshotId: string = "";

    let element: HTMLButtonElement;

    const onMenuClick = () => {
        open = !open;
    };

    const handleGlobalClick = (event: MouseEvent) => {
        if (!open) return;

        if (!element.contains(event.target as Node)) {
            open = false;
        }
    };

    onMount(() => {
        document.addEventListener("click", handleGlobalClick);

        return () => {
            document.removeEventListener("click", handleGlobalClick);
        };
    });

    const onQueueClick = async () => {
        await fetch(`/api/queue?uri=spotify:track:${id}`, {
            method: "POST",
        });
    };

    // const onPlaylistClick = async (playlist: SpotifyApi.PlaylistObjectSimplified) => {
    //     const payload = {
    //         playlistId: playlist.id,
    //         uris: [`spotify:track:${id}`],
    //     };

    //     const res = await fetch("/api/playlist/tracks/append", {
    //         method: "POST",
    //         body: JSON.stringify(payload),
    //     });

    //     if (res.ok) {
    //         console.log("added");
    //     }
    // };

    // const onRemoveClick = async () => {
    //     if (!ownedPlaylistId) {
    //         return;
    //     }

    //     const payload = {
    //         playlistId: ownedPlaylistId,
    //         uris: [`spotify:track:${id}`],
    //         snapshotId,
    //     };

    //     const res = await fetch(`/api/playlist/tracks/delete`, {
    //         method: "DELETE",
    //         body: JSON.stringify(payload),
    //     });

    //     if (res.ok) {
    //         console.log("removed");
    //     }
    // };
</script>

<button on:click={onMenuClick} bind:this={element} class="relative h-full">
    <Icon name="menu" class="h-full w-6 group-hover:text-gray-500 {open ? 'text-gray-500' : 'text-transparent'}" />

    {#if open}
        <div
            class="absolute right-0 z-10 mt-2 flex w-48 cursor-default flex-col rounded-md border border-gray-700/50 bg-gray-800"
        >
            <!-- <TrackItemMenuRow>
                <button class="relative contents">
                    <Icon name="arrow-left" class="mt-0.5 h-5 w-5 text-gray-500" title="Add to Playlist" />
                    <span class="flex-grow text-left">Add to Playlist</span>
                    <div
                        class="custom-scrollbar absolute right-[103%] top-0 z-20 flex max-h-72 w-52 flex-col overflow-y-auto rounded-md border border-gray-700/50 bg-gray-800"
                    >
                        {#each $userOwnedPlaylistsStore as playlist}
                            <TrackItemMenuRow>
                                <button class="contents w-full" on:click={() => onPlaylistClick(playlist)}>
                                    <img
                                        src={playlist.images[0]?.url}
                                        alt={playlist.name}
                                        title={playlist.name}
                                        class="h-8 w-8 select-none rounded-full object-cover"
                                    />
                                    <span>{playlist.name}</span>
                                </button>
                            </TrackItemMenuRow>
                        {/each}
                        <TrackItemMenuRow>
                            <Icon name="add" class="mt-0.5 h-5 w-5 text-gray-500" title="Create New Playlist" />
                            <span class="flex-grow text-left">Create New Playlist</span>
                        </TrackItemMenuRow>
                    </div>
                </button>
            </TrackItemMenuRow>
            {#if ownedPlaylistId}
                <TrackItemMenuRow>
                    <button on:click={onRemoveClick} class="contents">
                        <Icon name="delete" class="mt-0.5 h-5 w-5 text-gray-500" title="Remove from Playlist" />
                        <span class="flex-grow text-left">Remove</span>
                    </button>
                </TrackItemMenuRow>
            {/if} -->
            <TrackItemMenuRow>
                <button on:click={onQueueClick} class="contents">
                    <Icon name="add-to-queue" class="mt-0.5 h-5 w-5 text-gray-500" title="Add to Queue" />
                    <span class="flex-grow text-left">Add to Queue</span>
                </button>
            </TrackItemMenuRow>
            <TrackItemMenuRow>
                <a href={`/play/radio?track=${id}`} class="contents">
                    <Icon name="radio" class="mt-0.5 h-5 w-5 text-gray-500" title="Like" />
                    <span class="flex-grow text-left">Radio</span>
                </a>
            </TrackItemMenuRow>
        </div>
    {/if}
</button>
