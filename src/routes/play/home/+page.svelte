<script lang="ts">
    import { GeneralPage, SpotifyObjectList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: playlists = data.playlists;
    $: featured = data.featured
</script>

<GeneralPage>
    <SpotifyObjectList title="Recently Played Playlists" items={playlists} />
    <SpotifyObjectList title="Featured" items={featured} />
</GeneralPage>
