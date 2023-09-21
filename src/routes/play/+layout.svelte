<script lang="ts">
    import { AccountMenu, MenuNavLink, Player } from "$lib/components";
    import { pageTitleStore } from "$lib/stores";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<svelte:head>
    <title>{$pageTitleStore || "YASC - Spotify Client"}</title>
</svelte:head>

<div class="h-full w-full flex flex-col">
    <div class="flex-grow min-h-0 pb-8">
        <div class="h-full w-full flex flex-col overflow-auto">
            <div class="h-14 flex flex-row items-center justify-end p-4 border-b border-gray-800/50">
                <div class="flex-grow min-w-0 flex flex-row pl-8 gap-6">
                    <MenuNavLink href="/play/home" label="Home" />
                    <MenuNavLink href="/play/library/playlists" label="Playlists" />
                    <MenuNavLink href="/play/library/tracks" label="Tracks" />
                    <MenuNavLink href="/play/library/artists" label="Artists" />
                    <MenuNavLink href="/play/library/albums" label="Albums" />
                </div>
                <AccountMenu username={data.username} />
            </div>
            <div class="py-3 pl-12 pr-1 flex flex-grow min-h-0 overflow-y-auto overflow-x-auto custom-scrollbar">
                <slot />
            </div>
        </div>
    </div>
    <Player />
</div>
