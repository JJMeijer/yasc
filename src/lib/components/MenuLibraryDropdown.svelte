<script lang="ts">
    import { page } from "$app/stores";
    import MenuLibraryNavLink from "./MenuLibraryNavLink.svelte";

    let open = false;

    $: libraryActive = $page.url.pathname.match(/^\/play\/library\/.+/) !== null;

    const onMouseEnter = () => {
        open = true;
    };

    const onMouseLeave = () => {
        open = false;
    };

    const onButtonClick = () => {
        open = !open;
    };
</script>

<div class="h-full flex items-center relative" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave} role="menu" tabindex="0">
    <button on:click={onButtonClick} class="border-b {libraryActive ? 'border-primary/90' : 'hover:border-gray-300 border-transparent'}">Library</button>
    {#if open}
        <div
            role="menu"
            tabindex="0"
            on:click={() => open = false}
            on:keypress={(event) => event.key === "Enter" && (open = false)}
            class="absolute z-10 w-40 border border-gray-800/50 flex flex-col left-0 gap-1 top-full bg-gray-900 rounded-md cursor-default"
        >
            <MenuLibraryNavLink href="/play/library/playlists" label="Playlists" />
            <MenuLibraryNavLink href="/play/library/tracks" label="Tracks" />
            <MenuLibraryNavLink href="/play/library/artists" label="Artists" />
            <MenuLibraryNavLink href="/play/library/albums" label="Albums" />
        </div>
    {/if}
</div>
