<script lang="ts">
    import { SpotifyObjectList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<div class="flex flex-col gap-8 pl-12">
    <SpotifyObjectList title="Recently Played Playlists" items={data.playlists} />
    <SpotifyObjectList title="Featured" items={data.featured} />
</div>
