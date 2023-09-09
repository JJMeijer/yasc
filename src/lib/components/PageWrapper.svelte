<script lang="ts">
    import AccountMenu from "$lib/components/AccountMenu.svelte";

    export let displayName: string;
    export let username: string;
</script>

<div class="h-full w-full flex flex-col overflow-hidden">
    <div class="h-14 flex flex-row items-center justify-end p-4">
        <div class="flex-grow min-w-0 flex flex-row">
            <slot name="header" />
        </div>
        <AccountMenu {displayName} {username} />
    </div>
    <div class="p-6 flex flex-grow min-h-0">

    <slot />
    </div>
</div>
