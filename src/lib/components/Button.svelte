<script lang="ts">
	export let label: string;
	export let onClick: (event: MouseEvent) => void = () => {};
	export let href: string = "";

	let className = "bg-primary text-white p-2 rounded-md hover:bg-primary/90 min-w-[8rem] text-center";
</script>

{#if href}
	<a {href} class={className}>
		{label}
	</a>
{:else}
	<button on:click={onClick} class={className}>
		{label}
	</button>
{/if}
