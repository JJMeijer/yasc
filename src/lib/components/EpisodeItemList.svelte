<script lang="ts">
    import Icon from "./Icon.svelte";
</script>

<div class="flex flex-col pr-2">
    <!-- This columns row corresponds with the column styles within EpisodeItem, but is not nicely coupled right now :(-->
    <div class="flex flex-row items-center gap-1 border-b border-gray-700/50 px-1 py-2.5 text-gray-400">
        <span class="w-7">#</span>
        <div class="flex flex-grow">
            <span class="w-3/4 px-0.5">Title</span>
            <span class="w-1/4"></span>
        </div>

        <Icon name="like" class="w-6 cursor-default" />

        <div class="ml-2 flex w-10 justify-end pr-1">
            <Icon name="duration" class="w-5 cursor-default" />
        </div>
    </div>
    <slot />
</div>
