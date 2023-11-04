<script lang="ts">
    import { isAlbumObjectSimplified } from "@type-guards";
    import SpotifyObjectListItem from "./SpotifyObjectListItem.svelte";
    import ObjectList from "./ObjectList.svelte";
    import type { CustomCategoryObject } from "@types";
    import { page } from "$app/stores";

    export let title: string;
    export let items:
        | SpotifyApi.AlbumObjectSimplified[]
        | SpotifyApi.PlaylistObjectSimplified[]
        | SpotifyApi.ArtistObjectFull[]
        | SpotifyApi.ShowObjectSimplified[]
        | CustomCategoryObject[];

    const getSubLabel = (item: SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified | SpotifyApi.ArtistObjectFull | SpotifyApi.ShowObjectSimplified | CustomCategoryObject) => {
        if (isAlbumObjectSimplified(item)) {
            if ($page.route.id === "/play/artist/[artistId]") {
                return item.release_date.split("-")[0] || "";
            }

            return item.artists.map((artist) => artist.name).join(", ");
        }

        return "";
    };
</script>


<ObjectList title={title}>
    {#each items as item}
        <SpotifyObjectListItem uri={item.uri} images={item.images} label={item.name} subLabel={getSubLabel(item)} />
    {/each}

</ObjectList>
