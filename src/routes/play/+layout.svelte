<script lang="ts">
    import { AccountMenu, Player } from "$lib/components";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;
</script>

<div class="h-full w-full flex flex-col">
    <div class="flex-grow min-h-0">
        <div class="h-full w-full flex flex-col overflow-auto">
            <div class="h-14 flex flex-row items-center justify-end p-4">
                <div class="flex-grow min-w-0 flex flex-row pl-8">
                    <a href="/play/home">Home</a>
                </div>
                <AccountMenu username={data.username} />
            </div>
            <div class="py-3 pl-12 pr-1 flex flex-grow min-h-0 overflow-auto">
                <slot />
            </div>
        </div>
    </div>
    <Player />
</div>
