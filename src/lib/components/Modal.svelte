<script lang="ts">
    export let show: boolean = true;

    let dialog: HTMLDialogElement;

    $: if (dialog && show) dialog.showModal();
    $: if (dialog && !show) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog class="backdrop:backdrop-blur-sm bg-transparent outline-none" bind:this={dialog} on:click|self={() => dialog.close()} on:close={() => show = false}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <slot />
    </div>
</dialog>
