<script lang="ts">
    import { GeneralPage, ObjectList, ObjectListItem } from "$lib/components";
    import { getImageBySize, resolveSpotifyUri } from "$lib/utility";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<GeneralPage>
    <ObjectList title="Playlists">
        {#each data.playlists as playlist}
            <ObjectListItem
                uri={resolveSpotifyUri(playlist.uri)}
                imageSrc={getImageBySize(playlist.images, 300)}
                label={playlist.name}
            />
        {/each}
    </ObjectList>
</GeneralPage>
