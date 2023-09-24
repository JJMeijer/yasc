<script lang="ts">
    import { SpotifyObjectList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<div class="flex flex-col gap-8">
    <SpotifyObjectList title="Playlists" items={data.playlists} />
</div>
