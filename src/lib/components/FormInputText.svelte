<script lang="ts">
    import FormLabel from "./FormLabel.svelte";

    export let label: string;
    export let name: string;
</script>

<FormLabel {label}>
    <input
        class="rounded-md border-2 border-gray-800/70 bg-gray-950 px-2 py-1 outline-none focus:border-gray-800"
        type="text"
        {name}
    />
</FormLabel>
