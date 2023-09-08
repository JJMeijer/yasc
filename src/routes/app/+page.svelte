<script lang="ts">
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<div>App, {data.displayName}</div>
<div>{JSON.stringify(data.playlists)}</div>
