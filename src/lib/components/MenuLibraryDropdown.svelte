<script lang="ts">
    import { page } from "$app/stores";
    import MenuLibraryNavLink from "./MenuLibraryNavLink.svelte";

    let open = false;

    $: libraryActive = $page.url.pathname.match(/^\/play\/library.*/) !== null;

    const onMouseEnter = () => {
        open = true;
    };

    const onMouseLeave = () => {
        open = false;
    };

    const onClick = () => {
        open = !open;
    };
</script>

<div
    class="relative flex h-full items-center"
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
    role="menu"
    tabindex="0"
>
    <button
        on:click={onClick}
        class="border-b-2 pb-0.5 {libraryActive ? 'border-primary/90' : 'border-transparent hover:border-gray-300'}"
    >
        Library
    </button>
    {#if open}
        <div
            role="menu"
            tabindex="0"
            on:click={() => (open = false)}
            on:keypress={(event) => event.key === "Enter" && (open = false)}
            class="absolute left-0 top-full z-10 flex w-40 cursor-default flex-col gap-1 rounded-md border border-gray-800/50 bg-gray-900"
        >
            <MenuLibraryNavLink href="/play/library/playlists" label="Playlists" />
            <MenuLibraryNavLink href="/play/library/tracks" label="Tracks" />
            <MenuLibraryNavLink href="/play/library/artists" label="Artists" />
            <MenuLibraryNavLink href="/play/library/albums" label="Albums" />
            <MenuLibraryNavLink href="/play/library/podcasts" label="Podcasts" />
        </div>
    {/if}
</div>
