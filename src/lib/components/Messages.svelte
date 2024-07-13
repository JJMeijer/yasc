<script lang="ts">
    import { messagesStore } from "$lib/stores";
    import type { BaseMessage } from "@types";
    import { blur } from "svelte/transition";

    const getBorderColor = (messageType: BaseMessage["type"]) => {
        switch (messageType) {
            case "success":
                return "border-primary/70";
            case "warning":
                return "border-yellow-500/70";
            case "error":
                return "border-red-500/70";
        }
    };
</script>

<div class="absolute bottom-5 flex w-full flex-col items-center gap-2">
    {#each $messagesStore as message}
        <div
            transition:blur
            class="flex min-h-10 max-w-96 flex-row items-center overflow-hidden rounded-xl border-2 bg-gray-800/80 shadow-lg {getBorderColor(
                message.type,
            )}"
        >
            {#if message.img}
                <img
                    src={message.img}
                    alt={message.content}
                    title={message.content}
                    class="h-10 w-10 select-none object-cover"
                />
            {/if}
            <span class="px-4">{message.content}</span>
        </div>
    {/each}
</div>
