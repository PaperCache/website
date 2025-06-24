<script lang="ts">
	const {
		title,
		children,
	}: Props = $props();

	type Props = {
		title?: string;
		children?: any;
	};
</script>

<div>
	{#if title}
		<h2>{title}</h2>
	{/if}

	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	@use "$lib/styles/app";

	h2 {
		color: #222222;
		font-size: 1.75em;
		font-weight: 700;
		margin-bottom: 16px;
	}

	div {
		width: 100%;
		max-width: 1320px;
		margin: 32px auto;
		padding: 0 32px;
		flex: 1 1 auto;

		@media screen and (max-width: app.$mobile-width) {
			padding: 0 16px;
		}
	}
</style>
