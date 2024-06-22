<script lang="ts">
    export let imageSrc: string;
    export let label: string;
    export let subLabel: string = "";
</script>

<div class="contents">
    <img src={imageSrc} alt={label} title={label} class="h-44 w-44 select-none rounded-md object-cover" />
    <div class="flex flex-col justify-center p-2">
        <span title={label} class="truncate text-gray-300 group-hover:text-gray-100">{label}</span>
        {#if subLabel}
            <span class="truncate text-gray-400">{subLabel}</span>
        {/if}
    </div>
</div>
