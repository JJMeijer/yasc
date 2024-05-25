<script lang="ts">
    import { onMount } from "svelte";

    export let username: string;

    $: initial = username[0]?.toUpperCase();

    let open = false;
    let element: HTMLButtonElement;

    const onMenuClick = () => {
        open = !open;
    };

    const handleGlobalClick = (event: MouseEvent) => {
        if (!open) return;

        if (!element.contains(event.target as Node)) {
            open = false;
        }
    };

    onMount(() => {
        document.addEventListener("click", handleGlobalClick);

        return () => {
            document.removeEventListener("click", handleGlobalClick);
        };
    });
</script>

<button
    on:click={onMenuClick}
    bind:this={element}
    class="relative h-8 w-8 rounded-full {open
        ? 'bg-gray-700'
        : 'bg-gray-800'} flex cursor-pointer items-center justify-center border border-gray-700 font-mono hover:bg-gray-700"
>
    <span>{initial}</span>
    {#if open}
        <div
            class="absolute right-0 top-full z-10 mt-2 flex w-40 cursor-default flex-col rounded-md border border-gray-800/50 bg-gray-900"
        >
            <span class="w-full border-b border-gray-800/50 py-2 text-center text-sm text-gray-500">
                {username}
            </span>
            <div class="flex flex-col gap-1">
                <a
                    data-sveltekit-preload-data="off"
                    href="/logout"
                    class="px-3 py-2 text-right text-sm text-gray-500 hover:text-gray-400"
                >
                    Logout
                </a>
            </div>
        </div>
    {/if}
</button>
