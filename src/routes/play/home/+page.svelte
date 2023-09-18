<script lang="ts">
    import { SpotifyObjectList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: console.log(data);
</script>

<div class="flex flex-col gap-8">
    <div class="flex flex-col gap-3">
        <SpotifyObjectList title="Playlists" items={data.playlists} />
    </div>
</div>
