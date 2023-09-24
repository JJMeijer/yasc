<script lang="ts">
    import { isAlbumObjectSimplified, isArtistObjectFull, isPlaylistObjectSimplified } from "@type-guards";
    import SpotifyObject from "./SpotifyObject.svelte";

    export let title: string;
    export let items:
        | SpotifyApi.AlbumObjectSimplified[]
        | SpotifyApi.PlaylistObjectSimplified[]
        | SpotifyApi.ArtistObjectFull[];

    const getSubLabel = (item: SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified | SpotifyApi.ArtistObjectFull) => {
        if (isAlbumObjectSimplified(item)) {
            return item.artists.map((artist) => artist.name).join(", ");
        }

        if (isPlaylistObjectSimplified(item)) {
            return `${item.tracks.total} tracks`;
        }

        if (isArtistObjectFull(item)) {
            return `${item.followers.total} followers`;
        }

        return "";
    };
</script>

<div class="flex flex-col gap-2">
    <p class="text-2xl">{title}</p>
    <div class="flex flex-row gap-8 flex-wrap">
        {#each items as item}
            <SpotifyObject uri={item.uri} images={item.images} label={item.name} subLabel={getSubLabel(item)} />
        {/each}
    </div>
</div>
