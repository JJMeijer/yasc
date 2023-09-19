<script lang="ts">
    import { TrackItem } from "$lib/components";
    import { resolveSpotifyUri } from "$lib/utility";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: descriptionParts = data.playlist.description?.split(/<a href=(.+?)<\/a>/).filter((x: string) => x) || [];
</script>

<div class="flex flex-row gap-8 w-full">
    <div class="flex flex-col gap-6 w-1/4">
        <p class="text-3xl">{data.playlist.name}</p>
        <p class="text-gray-500">
            {#each descriptionParts as part}
                {#if part.match("spotify:.+")}
                    <a class="text-gray-400 hover:underline underline-offset-2" href={resolveSpotifyUri(part.split(">")[0])}>
                        {part.split(">")[1]}
                    </a>
                {:else}
                    <!-- This is hilarious & sad at the same time -->
                    <span class="{part === ", " ? "-ml-1" : ""}">{part}</span>
                {/if}
            {/each}
        </p>
        <div class="w-72 h-72 rounded-md overflow-hidden">
            <img
                src={data.playlist.images[0]?.url}
                alt={data.playlist.name}
                title={data.playlist.name}
                class="w-full h-full object-cover select-none"
            />
        </div>
    </div>

    <div
        class="flex flex-col p-4 overflow-auto w-3/4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-md scrollbar-track-rounded-md"
    >
        {#each data.playlist.tracks.items as item, index}
            {#if item.track}
                <TrackItem track={item.track} contextUri={data.playlist.uri} offset={item.track.uri} {index} />
            {/if}
        {/each}
    </div>
</div>