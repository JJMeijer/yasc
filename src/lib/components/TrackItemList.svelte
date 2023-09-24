<script lang="ts">
    import Icon from "./Icon.svelte";
</script>

<div class="flex flex-col overflow-y-auto custom-scrollbar pr-2 pb-4">
    <!-- This columns row corresponds with the column styles within trackItem, but is not nicely coupled right now :(-->
    <div class="flex flex-row px-1 py-2.5 items-center gap-1 text-gray-400 border-b border-gray-700/50">
        <span class="w-7"> # </span>
        <div class="flex flex-grow">
            <span class="w-1/2 px-0.5"> Title </span>
            <span class="w-1/2"> Album </span>
        </div>

        <Icon name="like" class="w-6 cursor-default" />

        <div class="w-10 flex justify-end pr-1">
            <Icon name="duration" class="w-5 cursor-default" />
        </div>
    </div>
    <slot />
</div>
