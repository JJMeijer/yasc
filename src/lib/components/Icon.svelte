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
        | "like"
        | "queue"
        | "duration"
        | "repeat"
        | "repeat-single"
        | "shuffle"
        | "check"
        | "menu"
        | "arrow-left"
        | "radio"
        | "spinner";

    export let title: string = "";
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
            <title>{title || "Play"}</title>
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
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
            <title>{title || "Pause"}</title>
            <circle cx="12" cy="12" r="10" />
            <line x1="10" y1="15" x2="10" y2="9" />
            <line x1="14" y1="15" x2="14" y2="9" />
        </svg>
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
            <title>{title || "Next"}</title>
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
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
            <title>{title || "Prev"}</title>
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" />
        </svg>
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
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        </svg>
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
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
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
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
    {/if}

    {#if name === "like"}
        <svg class={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>{title || "Like"}</title>
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
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
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
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 15" />
        </svg>
    {/if}

    {#if name === "shuffle"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>{title || "Shuffle"}</title>
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
    {/if}

    {#if name === "repeat"}
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
            <title>{title || "Repeat"}</title>
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
            <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3-3l3-3" />
        </svg>
    {/if}

    {#if name === "repeat-single"}
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
            <title>{title || "Repeat"}</title>
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />
            <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3-3l3-3" />
            <path d="M11 11l1 -1v4" />
        </svg>
    {/if}

    {#if name === "check"}
        <svg class={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>{title || "Check"}</title>
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    {/if}

    {#if name === "spinner"}
        <svg class={className} width="24" height="24" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Loading...</title>
            <style>
                .spinner_V8m1 {
                    transform-origin: center;
                    animation: spinner_zKoa 2s linear infinite;
                }
                .spinner_V8m1 circle {
                    stroke-linecap: round;
                    animation: spinner_YpZS 1.5s ease-in-out infinite;
                }
                @keyframes spinner_zKoa {
                    100% {
                        transform: rotate(360deg);
                    }
                }
                @keyframes spinner_YpZS {
                    0% {
                        stroke-dasharray: 0 150;
                        stroke-dashoffset: 0;
                    }
                    47.5% {
                        stroke-dasharray: 42 150;
                        stroke-dashoffset: -16;
                    }
                    95%,
                    100% {
                        stroke-dasharray: 42 150;
                        stroke-dashoffset: -59;
                    }
                }
            </style>
            <g class="spinner_V8m1">
                <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" stroke="currentColor"></circle>
            </g>
        </svg>
    {/if}

    {#if name === "menu"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>{title || "Menu"}</title>
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    {/if}

    {#if name === "arrow-left"}
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
            <title>{title || "Left"}</title>
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="15 6 9 12 15 18" />
        </svg>
    {/if}

    {#if name === "radio"}
        <svg
            class={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <title>{title || "Radio"}</title>
            <circle cx="12" cy="12" r="2" />
            <path
                d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
            />
        </svg>
    {/if}
</button>
