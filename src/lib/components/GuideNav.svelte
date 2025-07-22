<script lang="ts">
	import { base } from "$app/paths";

	const {
		title,
		pages,
	}: Props = $props();

	type Props = {
		title?: string;
		pages: Page[];
	};

	type Page = {
		title: string;
		slug: string;
	};
</script>

<h2>{title || "On this page"}</h2>

<div>
	{#each pages as page}
		<a href="{base}/guide{page.slug}">{page.title}</a>
	{/each}
</div>

<style lang="scss">
	@use "$lib/styles/app";

	h2 {
		@include app.themed("light") { color: #222222; }
		@include app.themed("night") { color: #ffffff; }
		font-size: 1.5em;
		line-height: 1.5em;
		font-weight: 700;
		margin-bottom: 16px;
		padding-bottom: 8px;
		border-bottom: 1px solid;
		@include app.themed("light") { border-color: #dddddd; }
		@include app.themed("night") { border-color: #424242; }
	}

	div {
		display: flex;
		flex-direction: column;

		a {
			@include app.themed("light") { color: #222222; }
			@include app.themed("night") { color: #ffffff; }
			font-size: 1.1em;
			font-weight: 700;
			width: 100%;
			margin-top: 16px;
			padding: 32px;
			@include app.themed("light") { background-color: #f8f8f8; }
			@include app.themed("night") { background-color: #333333; }
			border: 1px solid;
			@include app.themed("light") { border-color: #222222; }
			@include app.themed("night") { border-color: #ffffff; }
			border-radius: 4px;
		}
	}
</style>
