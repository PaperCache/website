<script lang="ts">
	import { page } from "$app/state";
	import { ThemeManager } from "$lib/utils/theme-manager";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	const { children } = $props();
	const theme = ThemeManager.init();
</script>

<svelte:head>
	<title>PaperCache</title>
</svelte:head>

<main class={[$theme, page.route.id?.startsWith("/guide") ? "fixed-height": ""]}>
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

		&.light {
			background-color: #ffffff;
		}

		&.night {
			background-color: #222222;
		}

		&.fixed-height {
			height: 100vh;

			@media screen and (max-width: app.$mobile-width) {
				height: auto;
			}
		}
	}
</style>
