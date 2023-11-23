<script lang="ts">
    export let title: string;
</script>

<div class="flex flex-col gap-3">
    <p class="text-2xl">{title}</p>
    <div class="flex flex-row gap-8 flex-wrap">
        <slot />
    </div>
</div>
