<script lang="ts">
    import { navigating } from "$app/stores";
    import { pageTitleStore, userOwnedPlaylistsStore } from "$lib/stores";
    import {
        AccountMenu,
        LoadingOverlay,
        MenuNavLink,
        Player,
        Search,
        MenuLibraryDropdown,
        Messages,
    } from "$lib/components";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;

    $: userOwnedPlaylistsStore.set(data.userOwnedPlaylists);
</script>

<svelte:head>
    <title>{$pageTitleStore || "YASC - Spotify Client"}</title>
</svelte:head>

<div class="flex h-full w-full flex-col">
    <div class="min-h-0 flex-grow">
        <div class="relative flex h-full w-full flex-col overflow-auto">
            <div class="flex h-14 min-h-[3.5rem] flex-row items-center justify-end">
                <div class="flex h-full min-w-0 flex-grow flex-row items-center gap-6 pl-12">
                    <MenuNavLink href="/play/home" label="Home" />
                    <MenuLibraryDropdown />
                    <MenuNavLink href="/play/browse" label="Browse" />
                    <MenuNavLink href="/play/discover" label="Discover" />
                </div>
                <div class="flex items-center gap-6 pr-4">
                    <Search />
                    <AccountMenu username={data.username} />
                </div>
            </div>
            <div class="flex min-h-0 flex-grow">
                <slot />
            </div>

            {#if $navigating}
                <LoadingOverlay />
            {/if}

            <Messages />
        </div>
    </div>
    <Player />
</div>
