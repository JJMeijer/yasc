<script lang="ts">
    export let label: string;
</script>

<label class="flex flex-col gap-1">
    <span class="ml-0.5 text-gray-500">{label}:</span>
    <slot />
</label>
