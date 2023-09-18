<script lang="ts">
    import { playerStateStore } from "$lib/stores";
    import { resolveSpotifyUri } from "$lib/utility";

    $: trackName = $playerStateStore?.track_window.current_track.name;
    $: artists = $playerStateStore?.track_window.current_track.artists || [];
    $: albumImage = $playerStateStore?.track_window.current_track.album.images[0]?.url;
    $: albumLink = resolveSpotifyUri($playerStateStore?.track_window.current_track.album.uri);
</script>

<svelte:head>
    {#if trackName}
        <title>YASC - {trackName} - {artists.map((a) => a.name).join(", ")}</title>
    {/if}
</svelte:head>

<div class="contents">
    <a href={albumLink} class="h-full {!albumImage && 'border border-gray-700/50'}">
        {#if albumImage}
            <img src={albumImage} alt="album cover" class="h-full object-cover" />
        {/if}
    </a>
    <div class="flex flex-col">
        <p class="select-none">{trackName || ""}</p>
        <div class="inline-flex">
            {#each artists as artist, index}
                <a
                    href={resolveSpotifyUri(artist.uri)}
                    class="text-sm text-gray-500 hover:text-gray-400 hover:underline underline-offset-2">{artist.name}</a
                >
                {#if index < artists.length - 1}
                    <span class="text-sm text-gray-500">,&nbsp;</span>
                {/if}
            {/each}
        </div>
    </div>
</div>
