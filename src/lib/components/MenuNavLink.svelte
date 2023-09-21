<script lang="ts">
    import { page } from "$app/stores";

    export let label: string;
    export let href: string = "";

    $: active = $page.url.pathname === href;
</script>

<a class="border-b {active ? 'border-primary/90' : 'hover:border-gray-300 border-transparent'}" {href}>{label}</a>
