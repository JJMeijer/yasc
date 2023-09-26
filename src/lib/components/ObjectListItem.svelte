<script lang="ts">
    export let uri: string;
    export let imageSrc: string;
    export let label: string;
    export let subLabel: string = "";
</script>

<a
    href={uri}
    class="relative w-44 rounded-md overflow-hidden cursor-pointer bg-gray-900 hover:after:bg-gray-100/10 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-transparent"
>
    <img
        src={imageSrc}
        alt={label}
        title={label}
        class="w-44 h-44 object-cover select-none"
    />
    <div class="h-16 flex flex-col justify-center p-2">
        <span class="text-gray-300 truncate">{label}</span>
        <span class="text-gray-400 truncate">{subLabel}</span>
    </div>
</a>
