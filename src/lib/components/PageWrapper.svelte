<script lang="ts">
    import AccountMenu from "$lib/components/AccountMenu.svelte";
    import Player from "./Player.svelte";

    export let username: string;
</script>

<div class="h-full w-full flex flex-col">
    <div class="flex-grow min-h-0">
        <div class="h-full w-full flex flex-col overflow-auto">
            <div class="h-14 flex flex-row items-center justify-end p-4">
                <div class="flex-grow min-w-0 flex flex-row">
                    <slot name="header" />
                </div>
                <AccountMenu {username} />
            </div>
            <div class="py-3 pl-12 pr-1 flex flex-grow min-h-0 overflow-auto">
                <slot />
            </div>
        </div>
    </div>
    <Player />
</div>
