<script lang="ts">
    export let uri: string;
    export let imageSrc: string;
    export let label: string;
    export let subLabel: string = "";
</script>

<a
    href={uri}
    class="group relative w-44 cursor-pointer hover:after:bg-gray-100/10 after:absolute after:w-full after:h-44 after:top-0 after:left-0 after:bg-transparent"
>
    <img
        src={imageSrc}
        alt={label}
        title={label}
        class="w-44 h-44 object-cover rounded-md select-none"
    />
    <div class="flex flex-col justify-center p-2 ">
        <span class="text-gray-300 truncate group-hover:text-gray-100">{label}</span>
        {#if subLabel}
            <span class="text-gray-400 truncate">{subLabel}</span>
        {/if}
    </div>
</a>
