<script lang="ts">
    let className: string;
    export { className as class };

    export let name: "play" | "pause";

    export let onClick: (event: MouseEvent) => void = () => {};
</script>

<button class="contents" on:click={onClick}>
    {#if name === "play"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="10" /> <polygon points="10 8 16 12 10 16 10 8" /></svg
        >
    {/if}

    {#if name === "pause"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="10" /> <line x1="10" y1="15" x2="10" y2="9" />
            <line x1="14" y1="15" x2="14" y2="9" /></svg
        >
    {/if}
</button>
