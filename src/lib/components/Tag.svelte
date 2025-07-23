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
	@use "$lib/styles/app";

	span, a {
		font-size: inherit;
		line-height: inherit;
		max-width: 100%;
		padding: 0 4px;
		@include app.themed("light") { background-color: #f8f8f8; }
		@include app.themed("night") { background-color: #333333; }
		border: 1px solid;
		@include app.themed("light") { border-color: #222222; }
		@include app.themed("night") { border-color: #424242; }
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
		@include app.themed("light") { color: #0065f8; }
		@include app.themed("night") { color: #0560e5; }

		&:hover {
			@include app.themed("light") { border-color: #0065f8; }
			@include app.themed("night") { border-color: #0560e5; }
		}

		:global(svg) {
			height: inherit;
			width: inherit;
			@include app.themed("light") { fill: #0065f8; }
			@include app.themed("night") { fill: #0560e5; }
			vertical-align: text-bottom;
		}
	}
</style>
