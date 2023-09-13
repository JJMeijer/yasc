<script lang="ts">
    import { TrackItem } from "$lib/components";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<PageWrapper username={data.username} accessToken={data.accessToken}>
    <div class="flex flex-row gap-8 w-full">
        <div class="flex flex-col gap-6 w-1/4">
            <p class="text-3xl">{data.playlist.name}</p>
            <p class="text-gray-500">{data.playlist.description}</p>
            <div class="w-72 h-72 rounded-md overflow-hidden">
                <img
                    src={data.playlist.images[0]?.url}
                    alt={data.playlist.name}
                    title={data.playlist.name}
                    class="w-full h-full object-cover select-none"
                />
            </div>
        </div>

        <div class="flex flex-col p-4 overflow-auto w-3/4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
            {#each data.playlist.tracks.items as item}
                {#if item.track}
                    <TrackItem track={item.track} contextUri={data.playlist.uri} offset={item.track.uri} />
                {/if}
            {/each}
        </div>
    </div>
</PageWrapper>
