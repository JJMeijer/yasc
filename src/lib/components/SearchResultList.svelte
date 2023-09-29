<script lang="ts">
    export let title: string;
</script>

<div class="flex flex-col w-1/2">
    <p class="text-lg">{title}</p>
    <slot />
</div>
