<script lang="ts">
    import { navigating } from "$app/stores";
    import { AccountMenu, LoadingOverlay, MenuNavLink, Player } from "$lib/components";
    import MenuLibraryDropdown from "$lib/components/MenuLibraryDropdown.svelte";
    import { pageTitleStore } from "$lib/stores";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<svelte:head>
    <title>{$pageTitleStore || "YASC - Spotify Client"}</title>
</svelte:head>

<div class="h-full w-full flex flex-col">
    <div class="flex-grow min-h-0">
        <div class="h-full w-full flex flex-col overflow-auto relative">
            <div class="h-14 min-h-[3.5rem] flex flex-row items-center justify-end">
                <div class="flex-grow min-w-0 flex flex-row pl-12 gap-6 h-full items-center">
                    <MenuNavLink href="/play/home" label="Home" />
                    <MenuLibraryDropdown />
                    <MenuNavLink href="/play/browse" label="Browse" />
                </div>
                <div class="pr-4">
                    <AccountMenu username={data.username} />
                </div>
            </div>
            <div class="flex flex-grow min-h-0">
                <slot />
            </div>
            {#if $navigating}
                <LoadingOverlay />
            {/if}
        </div>
    </div>
    <Player />
</div>
