<script lang="ts">
	const {
		pages,
	}: Props = $props();

	type Props = {
		pages: Page[];
	};

	type Page = {
		title: string;
		slug: string;
	};
</script>

{#each pages as page}
	<a href="guide/{page.slug}">
	</a>
{/each}

<style lang="scss">
</style>
