<script lang="ts">
    import { PageWrapper } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<PageWrapper username={data.username} >
    <div slot="header">
        <!-- make navlinks -->
        <a href="/app">Home</a>
    </div>

    <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-3">
            <p class="text-3xl select-none">Playlists</p>
            <div class="flex flex-row gap-8 flex-wrap">
                {#each data.playlists as playlist}
                   <a href="/playlist/{playlist.id}" class="relative w-44 h-44 rounded-md overflow-hidden cursor-pointer hover:after:bg-gray-100/10 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-transparent">
                        <img src={playlist.images[0]?.url} alt={playlist.name} title={playlist.name} class="w-full h-full object-cover select-none" />
                   </a>
                {/each}
            </div>
        </div>
    </div>
</PageWrapper>
