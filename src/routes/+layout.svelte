<script lang="ts">
	import { page } from "$app/state";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	const { children } = $props();
</script>

<svelte:head>
	<title>PaperCache</title>
</svelte:head>

<main class={page.route.id?.startsWith("/guide") ? "fixed-height": ""}>
	<Header
		minimized={page.route.id !== "/"}
		fixed={page.route.id === "/"}
	/>

	{@render children()}
	<Footer />
</main>

<style lang="scss">
	@use "$lib/styles/app";

	main {
		min-height: 100vh;
		min-width: 100vw;
		display: flex;
		flex-direction: column;

		&.fixed-height {
			height: 100vh;

			@media screen and (max-width: app.$mobile-width) {
				height: auto;
			}
		}
	}
</style>
