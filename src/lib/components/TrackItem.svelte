<script lang="ts">
    import { playerReady, token } from "$lib/stores";

    export let track: SpotifyApi.TrackObjectFull;

    const onTrackDoubleClick = () => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${$playerReady.device_id}`, {
            method: "PUT",
            body: JSON.stringify({
                context_uri: contextUri,
                offset: {
                    uri: offset,
                },
                position_ms: 0,
            }),
            headers: {
                Authorization: `Bearer ${$token}`,
                "Content-Type": "application/json",
            },
        });
    };

    export let contextUri: string;
    export let offset: string;
</script>

<div tabindex="0" role="button" on:dblclick={onTrackDoubleClick} class="flex flex-row border-b border-gray-700/50 p-1 hover:bg-gray-800/50 rounded-sm">
    <div class="flex flex-col px-1 gap-0.5">
        <span>{track.name}</span>
        <div class="inline-flex">
        {#each track.artists as artist, index}
            <a href="/artist/{artist.id}" class="text-sm text-gray-500 hover:text-gray-400">{artist.name}</a>
            {#if index < track.artists.length - 1}
                <span class="text-sm text-gray-500">,&nbsp;</span>
            {/if}
        {/each}

        </div>
    </div>
</div>
