<script lang="ts">
    import { page } from "$app/stores";

    export let href: string;
    export let label: string;

    $: active = $page.url.pathname === href;
</script>

<a data-sveltekit-preload-data="tap" {href} class="text-sm {active ? "text-primary/90" : "text-gray-500 hover:text-gray-400" } py-2 px-3">{label}</a>
