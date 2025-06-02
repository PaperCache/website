<script lang="ts">
	import Content from "$lib/components/Content.svelte";

	const POLICIES = [
		"LFU",
		"FIFO",
		"CLOCK",
		"SIEVE",
		"LRU",
		"MRU",
		"2Q",
		"Arc",
		"S3-FIFO",
	];
</script>

<Content title="Eviction policies">
	<p>PaperCache current supports the following {POLICIES.length} eviction policies:</p>

	<ul>
		{#each POLICIES as policy}
			<li>{policy}</li>
		{/each}
	</ul>

	<p>If you would like to add an eviction policy not listed here to PaperCache, follow <a href="/policy/custom">this</a> guide.</p>
</Content>

<style lang="scss">
	ul {
		margin-top: 8px;
		padding-left: 16px;
	}

	p a {
		color: #222222;
		text-decoration: underline;
	}
</style>
