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

	<a {href} {target} class="tag">
		<span>{@render children()}</span>

		{#if isExternal}
			<ExternalSvg />
		{/if}
	</a>
{:else}
	<div class="tag">
		<span>{@render children()}</span>
	</div>
{/if}

<style lang="scss">
	@use "$lib/styles/app";

	.tag {
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
		display: inline-flex;
		align-items: center;
		vertical-align: top;
		outline: none;

		span {
			font-size: inherit;
			line-height: inherit;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			flex: 1 1 auto;
		}
	}

	span.tag {
		color: inherit;
	}

	a.tag {
		@include app.themed("light") { color: #0065f8; }
		@include app.themed("night") { color: #2d83ff; }

		&:hover, &:focus {
			@include app.themed("light") { border-color: #0065f8; }
			@include app.themed("night") { border-color: #2d83ff; }
		}

		:global(svg) {
			height: 1em;
			width: 1em;
			margin-left: 4px;
			@include app.themed("light") { fill: #0065f8; }
			@include app.themed("night") { fill: #2d83ff; }
			flex: 0 0 auto;
		}
	}
</style>
