<div class="flex flex-row gap-8 w-full">
    <div class="flex flex-col gap-6 w-1/4">
        <slot name="sidebar" />
    </div>

    <div
        class="flex flex-col p-4 overflow-auto w-3/4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50 scrollbar-thumb-rounded-md scrollbar-track-rounded-md"
    >
        <slot name="tracks" />
    </div>
</div>
