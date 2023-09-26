<script lang="ts">
    import { isAlbumObjectSimplified, isArtistObjectFull, isPlaylistObjectSimplified } from "@type-guards";
    import SpotifyObjectListItem from "./SpotifyObjectListItem.svelte";
    import ObjectList from "./ObjectList.svelte";
    import type { CustomCategoryObject } from "@types";

    export let title: string;
    export let items:
        | SpotifyApi.AlbumObjectSimplified[]
        | SpotifyApi.PlaylistObjectSimplified[]
        | SpotifyApi.ArtistObjectFull[]
        | CustomCategoryObject[];

    const getSubLabel = (item: SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified | SpotifyApi.ArtistObjectFull | CustomCategoryObject) => {
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

<ObjectList title={title}>
    {#each items as item}
        <SpotifyObjectListItem uri={item.uri} images={item.images} label={item.name} subLabel={getSubLabel(item)} />
    {/each}
</ObjectList>
