<script lang="ts">
    let className: string;
    export { className as class };

    export let name:
        | "play"
        | "pause"
        | "next"
        | "prev"
        | "muted"
        | "volume-full"
        | "volume-half"
        | "devices"
        | "like"
        | "queue"
        | "duration";

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
            <title>Play</title>
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
            <title>Pause</title>
            <circle cx="12" cy="12" r="10" /> <line x1="10" y1="15" x2="10" y2="9" />
            <line x1="14" y1="15" x2="14" y2="9" /></svg
        >
    {/if}

    {#if name === "next"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>Next</title>
            <polygon points="5 4 15 12 5 20 5 4" /> <line x1="19" y1="5" x2="19" y2="19" /></svg
        >
    {/if}

    {#if name === "prev"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>Previous</title>
            <polygon points="19 20 9 12 19 4 19 20" /> <line x1="5" y1="19" x2="5" y2="5" /></svg
        >
    {/if}

    {#if name === "muted"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /></svg
        >
    {/if}

    {#if name === "volume-half"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /> <path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg
        >
    {/if}

    {#if name === "volume-full"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg
        >
    {/if}

    {#if name === "devices"}
        <svg
            class={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>Devices</title>
            <path stroke="none" d="M0 0h24v24H0z" /> <rect x="5" y="3" width="14" height="18" rx="2" />
            <circle cx="12" cy="14" r="3" /> <line x1="12" y1="7" x2="12" y2="7.01" /></svg
        >
    {/if}

    {#if name === "like"}
        <svg class={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Like</title>
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    {/if}

    {#if name === "queue"}
        <svg
            class={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>Queue</title>
            <path stroke="none" d="M0 0h24v24H0z" /> <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" /> <line x1="4" y1="18" x2="20" y2="18" /></svg
        >
    {/if}

    {#if name === "duration"}
        <svg
            class={className}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>Duration</title>
            <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 15" /></svg
        >
    {/if}
</button>
