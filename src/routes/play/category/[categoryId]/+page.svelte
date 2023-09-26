<script lang="ts">
    import { GeneralPage, SpotifyObjectList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<GeneralPage>
    <SpotifyObjectList title={data.category.name} items={data.playlists} />
</GeneralPage>
