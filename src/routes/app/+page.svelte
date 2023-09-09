<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<PageWrapper displayName={data.displayName} username={data.id} >
    <div slot="header">
        <!-- make navlinks -->
        <a href="/app">Home</a>
    </div>

    <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-3">
            <p class="text-3xl">Playlists</p>
            <div class="flex flex-row gap-6 overflow-x-scroll">
                {#each data.playlists as playlist}
                    <div class="w-48 h-48 rounded-md overflow-hidden">
                        <img src={playlist.images[0].url} class="w-full h-full object-cover" />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</PageWrapper>
