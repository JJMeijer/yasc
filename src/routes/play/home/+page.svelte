<script lang="ts">
    import { GeneralPage, SpotifyObjectList } from "$lib/components";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    let screenWidth: number;

    const fontSize = typeof document !== "undefined" ? parseFloat(getComputedStyle(document.documentElement).fontSize) : 16;
    const remToPx = (rem: number) => rem * fontSize;

    $: maxItems = screenWidth ? Math.floor(screenWidth / remToPx(13)) : 6;
    $: playlists = data.playlists.slice(0, maxItems);
    $: featured = data.featured.slice(0, maxItems);
</script>

<svelte:window bind:innerWidth={screenWidth} />

<GeneralPage>
    <SpotifyObjectList title="Recently Played Playlists" items={playlists} />
    <SpotifyObjectList title="Featured" items={featured} />
</GeneralPage>
