<script lang="ts">
    export let title: string;
</script>

<div class="flex w-1/2 flex-col">
    <p class="text-lg">{title}</p>
    <slot />
</div>
