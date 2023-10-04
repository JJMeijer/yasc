<script lang="ts">
    import { pageTitleStore, playerStateStore } from "$lib/stores";
    import { getImageBySize, resolveSpotifyUri } from "$lib/utility";
    import Like from "../Like.svelte";

    $: trackId = $playerStateStore?.track_window.current_track.id;
    $: trackName = $playerStateStore?.track_window.current_track.name;
    $: artists = $playerStateStore?.track_window.current_track.artists || [];
    $: albumImage = getImageBySize($playerStateStore?.track_window.current_track.album.images || [], 150);
    $: albumLink = resolveSpotifyUri($playerStateStore?.track_window.current_track.album.uri);

    let isLiked = false;

    const checkLike = async () => {
        const res = await fetch(`/api/likes?ids=${trackId}`);

        const data = (await res.json()) as boolean[];

        if (typeof data[0] === "boolean") {
            isLiked = data[0];
        }
    };
    $: trackId && checkLike();

    $: if (trackName) {
        $pageTitleStore = `YASC - ${trackName} - ${artists.map((a) => a.name).join(", ")}`;
    }
</script>

<div class="contents">
    <a href={albumLink} class="h-full w-[4.5rem] min-w-[4.5rem] {!albumImage && 'border border-gray-700/50'}">
        {#if albumImage}
            <img src={albumImage} alt="album cover" class="h-full object-cover" />
        {/if}
    </a>
    <div class="flex min-w-0 flex-grow flex-col">
        <p
            title={trackName}
            class="select-none truncate"
        >
            {trackName || ""}
        </p>
        <div class="inline">
            {#each artists as artist, index}
                <a
                    href={resolveSpotifyUri(artist.uri)}
                    class="text-sm text-gray-500 underline-offset-2 hover:text-gray-400 hover:underline">{artist.name}</a
                >
                {#if index < artists.length - 1}
                    <span class="-ml-1 text-sm text-gray-500">,&nbsp;</span>
                {/if}
            {/each}
        </div>
    </div>
    {#if trackId}
        <Like {trackId} liked={isLiked} />
    {/if}
</div>
