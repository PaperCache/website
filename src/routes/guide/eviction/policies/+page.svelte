<script lang="ts">
	import { base } from "$app/paths";
	import Tag from "$lib/components/Tag.svelte";

	const POLICIES = [
		"LFU",
		"FIFO",
		"CLOCK",
		"SIEVE",
		"LRU",
		"MRU",
		"2Q",
		"ARC",
		"S3-FIFO",
	];
</script>

<p>PaperCache current supports the following {POLICIES.length} eviction policies:</p>

<ul>
	{#each POLICIES as policy}
		<li>{policy}</li>
	{/each}
</ul>

<p>If you would like to add an eviction policy not listed here to PaperCache, follow <Tag href="{base}/guide/eviction/custom">this</Tag> guide.</p>

<style lang="scss">
	ul {
		margin-top: 8px;
		padding-left: 16px;
	}
</style>
