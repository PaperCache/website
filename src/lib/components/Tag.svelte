<script lang="ts">
	import ExternalSvg from "$lib/svgs/ExternalSvg.svelte";

	const {
		href,
		children,
	}: Props = $props();

	const target = href?.startsWith("/") || href?.startsWith("#")
		? "_self" : "_blank";

	type Props = {
		href?: string;
		children: any;
	};
</script>

{#if href}
	{@const isExternal = href.startsWith("http")}

	<a {href} {target}>
		{@render children()}

		{#if isExternal}
			<ExternalSvg />
		{/if}
	</a>
{:else}
	<span>{@render children()}</span>
{/if}

<style lang="scss">
	span, a {
		font-size: inherit;
		line-height: inherit;
		max-width: 100%;
		padding: 0 4px;
		background-color: #f8f8f8;
		border: 1px solid #222222;
		border-radius: 4px;
		white-space: nowrap;
		display: inline-block;
		vertical-align: top;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	span {
		color: inherit;
	}

	a {
		color: #0065f8;

		&:hover {
			border-color: #0065f8;
		}

		:global(svg) {
			height: inherit;
			width: inherit;
			fill: #0065f8;
			vertical-align: text-bottom;
		}
	}
</style>
