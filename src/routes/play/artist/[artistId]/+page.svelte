<script lang="ts">
    import { TrackItem } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: console.log(data);
</script>

<div class="flex flex-row gap-8 w-full">
    <div class="flex flex-col gap-6 w-1/4">
        <div class="flex flex-col gap-1">
            <p class="text-3xl">{data.artist.name}</p>
        </div>

        <div class="w-72 h-72 rounded-sm overflow-hidden">
            <img
                src={data.artist.images[0]?.url}
                alt={data.artist.name}
                title={data.artist.name}
                class="w-full h-full object-cover select-none"
            />
        </div>
        <p class="text-gray-500 text-sm">
            {data.artist.genres.join(", ")}
        </p>
    </div>

    <div
        class="flex flex-col p-4 overflow-auto w-3/4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-md scrollbar-track-rounded-md"
    >
        <div class="flex flex-col gap-2">
            <p class="text-2xl">Top Tracks</p>
            {#each data.topTracks.slice(0, 5) as track, index}
                <TrackItem track={track} uris={data.topTracks.map(trk => trk.uri).slice(index)} index={index} />
            {/each}
        </div>
    </div>
</div>
