<script lang="ts">
	const {
		href,
		children,
	}: Props = $props();

	type Props = {
		href?: string;
		children: any;
	};
</script>

{#if href}
	<a {href} target="_blank">{@render children()}</a>
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
		vertical-align: bottom;
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
	}
</style>
