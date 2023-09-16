<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    $: console.log(data);
</script>

<div class="flex flex-row gap-8 w-full">
    <div class="flex flex-col gap-6 w-1/4">
        <p class="text-3xl">{data.artist.name}</p>
    </div>
</div>
