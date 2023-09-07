<script lang="ts">
    export let label: string;
    export let onClick: (event: MouseEvent) => void = () => {};

    let className = "bg-primary text-white p-2 rounded-md hover:bg-primary/90 min-w-[8rem]"
</script>

<button on:click={onClick} class={className}>
    {label}
</button>
