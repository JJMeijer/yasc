<script lang="ts">
    import { GeneralPage, SpotifyObjectList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<GeneralPage>
    <SpotifyObjectList title="Albums" items={data.albums} />
</GeneralPage>
