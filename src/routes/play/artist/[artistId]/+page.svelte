<script lang="ts">
    import { SpotifyObjectList, TrackItem } from "$lib/components";
    import { getImageBySize } from "$lib/utility";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: albums = data.albums.filter((album) => album.album_group === "album");
    $: singles = data.albums.filter((album) => album.album_group === "single");
    $: compilations = data.albums.filter((album) => album.album_group === "compilation");
</script>

<div class="flex flex-row gap-8 w-full">
    <div class="flex flex-col gap-6 w-1/4">
        <div class="flex flex-col gap-1">
            <p class="text-3xl">{data.artist.name}</p>
            <p class="text-gray-500 text-sm">
                {data.artist.genres.join(", ")}
            </p>
        </div>

        <div class="w-72 h-72 rounded-sm overflow-hidden">
            <img
                src={getImageBySize(data.artist.images, 300)}
                alt={data.artist.name}
                title={data.artist.name}
                class="w-full h-full object-cover select-none"
            />
        </div>
    </div>

    <div
        class="flex flex-col p-4 overflow-auto w-3/4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-md scrollbar-track-rounded-md gap-8"
    >
        <div class="flex flex-col gap-2">
            <p class="text-2xl">Top Tracks</p>
            {#each data.topTracks.slice(0, 5) as track, index}
                <TrackItem {track} uris={data.topTracks.map((trk) => trk.uri).slice(index)} {index} />
            {/each}
        </div>

        {#if albums.length > 0}
            <SpotifyObjectList title="Albums" items={albums} />
        {/if}

        {#if singles.length > 0}
            <SpotifyObjectList title="Singles" items={singles} />
        {/if}

        {#if compilations.length > 0}
            <SpotifyObjectList title="Compilations" items={compilations} />
        {/if}

        {#if data.relatedArtists.length > 0}
            <SpotifyObjectList title="Related Artists" items={data.relatedArtists.slice(0, 5)} />
        {/if}
    </div>
</div>
