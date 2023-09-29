<script lang="ts">
    export let uri: string;
    export let imageSrc: string;
    export let label: string;
    export let subLabel: string = "";
</script>

<a
    href={uri}
    class="group relative w-44 cursor-pointer after:absolute after:left-0 after:top-0 after:h-44 after:w-full after:bg-transparent hover:after:bg-gray-100/10"
>
    <img src={imageSrc} alt={label} title={label} class="h-44 w-44 select-none rounded-md object-cover" />
    <div class="flex flex-col justify-center p-2">
        <span class="truncate text-gray-300 group-hover:text-gray-100">{label}</span>
        {#if subLabel}
            <span class="truncate text-gray-400">{subLabel}</span>
        {/if}
    </div>
</a>
