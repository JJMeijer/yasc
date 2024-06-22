<script lang="ts">
    import { GeneralPage, ObjectList, ObjectListItem } from "$lib/components";
    import { getImageBySize, resolveSpotifyUri } from "$lib/utility";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<GeneralPage>
    <ObjectList title="Albums">
        {#each data.albums as album}
            <ObjectListItem
                uri={resolveSpotifyUri(album.uri)}
                imageSrc={getImageBySize(album.images, 300) }
                label={album.name}
                subLabel={album.artists.map((artist) => artist.name).join(", ")}
            />
        {/each}
    </ObjectList>
</GeneralPage>
