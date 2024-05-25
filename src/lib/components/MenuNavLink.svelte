<script lang="ts">
    import { page } from "$app/stores";

    export let label: string;
    export let href: string = "";

    $: active = $page.url.pathname === href;
</script>

<a class="border-b-2 pb-0.5 {active ? 'border-primary/90' : 'border-transparent hover:border-gray-300'}" {href}>{label}</a>
