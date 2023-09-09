<script lang="ts">
    import { Player } from "$lib/components";
</script>

<div class="h-full w-full flex flex-col">
    <div class="flex-grow min-h-0">
        <slot />
    </div>
    <Player />
</div>
