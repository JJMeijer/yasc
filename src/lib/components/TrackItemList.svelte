<script lang="ts">
    import Icon from "./Icon.svelte";
</script>

<div class="flex flex-col pr-2">
    <!-- This columns row corresponds with the column styles within trackItem, but is not nicely coupled right now :(-->
    <div class="flex flex-row items-center gap-1 border-b border-gray-700/50 px-1 py-2.5 text-gray-400">
        <span class="w-7">#</span>
        <div class="flex flex-grow">
            <span class="w-1/2 px-0.5">Title</span>
            <span class="w-1/2">Album</span>
        </div>

        <div class="flex flex-row gap-6">
            <div class="w-6"><!--Like icon spacer--></div>
            <Icon name="duration" class="w-6 cursor-default" />
            <div class="w-6"><!--Menu icon spacer--></div>
        </div>
    </div>
    <slot />
</div>
