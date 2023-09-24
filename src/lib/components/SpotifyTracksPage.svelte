<div class="flex flex-row gap-8 w-full">
    <div class="flex flex-col gap-6 w-1/4 pl-12 py-4">
        <slot name="sidebar" />
    </div>

    <div class="flex flex-col w-3/4 custom-scrollbar overflow-y-auto pb-4">
        <slot name="tracks" />
    </div>
</div>
