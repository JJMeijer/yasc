<script lang="ts">
    import { Like, SpotifyObjectList, TrackItem, TrackItemList } from "$lib/components";
    import SpotifyTracksPage from "$lib/components/SpotifyTracksPage.svelte";
    import { getImageBySize } from "$lib/utility";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: albums = data.albums.filter((album) => album.album_group === "album");
    $: singles = data.albums.filter((album) => album.album_group === "single");
    $: compilations = data.albums.filter((album) => album.album_group === "compilation");

    let topTracksAmount = 5;

    const onShowMoreClick = () => {
        if (topTracksAmount === 5) topTracksAmount = 10;
        else if (topTracksAmount === 10) topTracksAmount = 5;
    };
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <div class="flex flex-row items-center justify-between pr-1">
            <div class="flex flex-col gap-1">
                <p class="text-3xl">{data.artist.name}</p>
                <p class="text-sm text-gray-500">
                    {data.artist.genres.join(", ")}
                </p>
            </div>

            <Like itemId={data.artist.id} type="artists" liked={data.liked} />
        </div>

        <div class="m-1 w-full overflow-hidden rounded-md">
            <img
                src={getImageBySize(data.artist.images, 300)}
                alt={data.artist.name}
                title={data.artist.name}
                class="h-full w-full select-none object-cover"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <div class="flex flex-col gap-2">
            <p class="text-2xl">Top Tracks</p>
            <TrackItemList>
                {#each data.topTracks.slice(0, topTracksAmount) as track, index}
                    <TrackItem
                        {track}
                        {index}
                        liked={data.likes.includes(track.id)}
                        album={track.album}
                        context={{ uris: data.topTracks.map((t) => t.uri).slice(index) }}
                    />
                {/each}
            </TrackItemList>

            <button class="ml-2 w-28 text-left text-gray-600 hover:text-gray-500" on:click={onShowMoreClick}>
                Show {topTracksAmount === 5 ? "More" : "less"}
            </button>

            <div class="flex flex-col gap-3 p-4">
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
    </div>
</SpotifyTracksPage>
