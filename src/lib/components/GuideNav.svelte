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
	h2 {
		color: #222222;
		font-size: 1.5em;
		line-height: 1.5em;
		font-weight: 700;
		margin-bottom: 16px;
		padding-bottom: 8px;
		border-bottom: 1px solid #dddddd;
	}

	div {
		display: flex;
		flex-direction: column;

		a {
			color: #222222;
			font-size: 1.1em;
			font-weight: 700;
			width: 100%;
			margin-top: 16px;
			padding: 32px;
			background-color: #f8f8f8;
			border: 1px solid #222222;
			border-radius: 4px;
		}
	}
</style>
