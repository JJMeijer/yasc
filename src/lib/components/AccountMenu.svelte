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

<button on:click={onMenuClick} bind:this={element} class="relative rounded-full h-9 w-9 {open ? "bg-gray-700" : "bg-gray-800"} font-mono flex items-center justify-center cursor-pointer border border-gray-700 hover:bg-gray-700">
    <span>{initial}</span>
    {#if open}
        <div class="absolute w-40 border border-gray-800/50 flex flex-col right-0 top-full bg-gray-900 rounded-md mt-2 cursor-default">
            <span class="text-sm w-full text-center border-b border-gray-800/50 py-2 text-gray-500">
                {username}
            </span>
            <div class="flex flex-col gap-1">
                <a href="/logout" class="text-sm text-gray-500 hover:text-gray-400 py-2 text-right px-3">Logout</a>
            </div>
        </div>
    {/if}
</button>
