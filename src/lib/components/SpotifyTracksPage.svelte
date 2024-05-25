<div class="flex w-full flex-row gap-8">
    <div class="flex w-1/4 flex-col gap-6 py-4 pl-12">
        <slot name="sidebar" />
    </div>

    <div class="custom-scrollbar flex w-3/4 flex-col overflow-y-auto pb-4">
        <slot name="tracks" />
    </div>
</div>
