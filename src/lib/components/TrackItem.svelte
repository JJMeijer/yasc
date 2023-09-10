<script lang="ts">
    export let track: SpotifyApi.TrackObjectFull;

    const onTrackDoubleClick = () => {
        console.log("play");
    };
</script>

<div tabindex="0" role="button" on:dblclick={onTrackDoubleClick} class="flex flex-row border-b border-gray-700/50 p-1 cursor-pointer hover:bg-gray-800">
    <div class="flex flex-col px-1 gap-0.5">
        <span>{track.name}</span>
        <div class="inline-flex">
        {#each track.artists as artist, index}
            <a href="/app/artist/{artist.id}" class="text-sm text-gray-500 hover:text-gray-400">{artist.name}</a>
            {#if index < track.artists.length - 1}
                <span class="text-sm text-gray-500">,&nbsp;</span>
            {/if}
        {/each}

        </div>
    </div>
</div>
