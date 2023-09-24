<script lang="ts">
    import SpotifyObjectList from "$lib/components/SpotifyObjectList.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<div class="pl-12">
    <SpotifyObjectList title="Albums" items={data.albums} />
</div>
