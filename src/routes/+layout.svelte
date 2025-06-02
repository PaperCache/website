<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	const { children } = $props();
</script>

<svelte:head>
	<title>PaperCache</title>
</svelte:head>

<main>
	<Header />
	{@render children()}
	<Footer />
</main>

<style lang="scss">
	main {
		min-height: 100vh;
		min-width: 100vw;
		display: flex;
		flex-direction: column;
	}
</style>
