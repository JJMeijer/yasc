<script lang="ts">
    import ObjectListItemContent from "./ObjectListItemContent.svelte";

    export let onClick: () => void = () => {};
    export let uri: string = "";
    export let imageSrc: string;
    export let label: string;
    export let subLabel: string = "";

    const groupClass =
        "group relative w-44 cursor-pointer after:absolute after:left-0 after:top-0 after:h-44 after:w-full after:bg-transparent hover:after:bg-gray-100/10";
</script>

{#if uri}
    <a href={uri} class={groupClass}>
        <ObjectListItemContent {imageSrc} {label} {subLabel} />
    </a>
{:else if onClick}
    <button class={groupClass} on:click={onClick}>
        <ObjectListItemContent {imageSrc} {label} {subLabel} />
    </button>
{:else}
    <div class={groupClass}>
        <ObjectListItemContent {imageSrc} {label} {subLabel} />
    </div>
{/if}
