<script lang="ts">
    import type { PageData } from "./$types";
    import { Icon, SpotifyTracksPage, TrackItemList } from "$lib/components";
    import { getImageBySize } from "$lib/utility";
    import TrackItem from "$lib/components/TrackItem.svelte";
    import type { CreatePlaylistData } from "@types";
    import { goto } from "$app/navigation";

    export let data: PageData;

    $: name = `${data.seed.name} Radio`;

    const onCreatePlaylist = async () => {
        const createPlaylistData: CreatePlaylistData = {
            name,
            description: `Recommendations based on: ${data.seed.name}`,
            uris: data.tracks.map((track) => track.uri),
        };

        const res = await fetch("/api/playlist/create", { method: "POST", body: JSON.stringify(createPlaylistData) });

        if (res.ok) {
            const { id: playlistId } = await res.json();
            goto(`/play/playlist/${playlistId}`);
        }
    };
</script>

<SpotifyTracksPage>
    <div slot="sidebar" class="contents">
        <div class="flex flex-row items-center justify-between pr-1">
            <p class="text-3xl">{name}</p>
            <Icon
                onClick={onCreatePlaylist}
                title="Add Playlist To Library"
                name="add"
                class="h-6 w-6 text-gray-500 hover:text-gray-400"
            />
        </div>

        <div class="mx-1 w-full overflow-hidden rounded-md">
            <img
                src={getImageBySize(data.seed.album.images, 300)}
                alt={data.seed.name}
                title={data.seed.name}
                class="h-full w-full select-none object-cover"
            />
        </div>
    </div>

    <div slot="tracks" class="contents">
        <TrackItemList>
            {#each data.tracks as track, index}
                <TrackItem
                    track={track}
                    {index}
                    album={track.album}
                    liked={data.likes.includes(track.id)}
                    context={{ uris: data.tracks.slice(index).map((track) => track.uri) }}
                />
            {/each}
        </TrackItemList>
    </div>
</SpotifyTracksPage>
