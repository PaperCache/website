<script lang="ts">
    import { onMount } from "svelte";
    import { base } from "$app/paths";
    import LogoSvg from "$lib/svgs/LogoSvg.svelte";
    import MenuSvg from "$lib/svgs/MenuSvg.svelte";

    const MINIMIZED_THRESHOLD: number = 0;

    let minimized: boolean = $state(false);
    let menuOpen: boolean = $state(false);

	function handleScroll() {
		minimized = window.scrollY > MINIMIZED_THRESHOLD;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	onMount(() => {
		minimized = window.scrollY > MINIMIZED_THRESHOLD;

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<header class={minimized ? "minimized" : ""}>
	<a href="{base}/" class="name">
		<LogoSvg />
		PaperCache
	</a>

	<button onclick={toggleMenu}>
		<MenuSvg />
	</button>

	{#if menuOpen}
		<div class="shade" onclick={closeMenu}></div>
	{/if}

	<nav class={menuOpen ? "open" : ""}>
		<a href="{base}/">Home</a>
		<a href="{base}/policy">Policies</a>
		<a href="{base}/client">Clients</a>
		<a href="{base}/">Paper</a>
		<a href="{base}/">GitHub</a>
	</nav>
</header>

<div class="spacer"></div>

<style lang="scss">
	@use "$lib/styles/app";

	header {
		width: 100%;
		padding: 20px 64px;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		transition: padding 0.15s ease-out, box-shadow 0.15s ease-out;
		z-index: 9999;

		@media screen and (max-width: app.$mobile-width) {
			padding: 8px 16px;
		}
	}

	.name {
		color: #222222;
		font-size: 1.65em;
		line-height: 1.65em;
		font-weight: 300;
		text-decoration: none;
		display: flex;
		transition: font-size 0.15s ease-out, line-height 0.15s ease-out;

		@media screen and (max-width: app.$mobile-width) {
			font-size: 1.25em;
			line-height: 1.25em;
		}

		:global(svg) {
			height: 1.65em;
			width: 1.65em;
			margin-right: 8px;

			@media screen and (max-width: app.$mobile-width) {
				height: 1.25em;
				width: 1.25em;
			}
		}
	}

	nav {
		margin-left: auto;

		&.open {
			left: 20%;
		}

		@media screen and (max-width: app.$mobile-width) {
			height: 100%;
			width: 80%;
			padding: 64px 0;
			background-color: #ffffff;
			box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.15);
			display: flex;
			flex-direction: column;
			position: fixed;
			top: 0;
			left: 100%;
			z-index: 9999;
			transition: left 0.25s ease-out;
		}

		a {
			color: #555555;
			font-size: 1em;
			line-height: 1em;
			margin-left: 24px;
			transition:
				font-size 0.15s ease-out,
				line-height 0.15s ease-out,
				margin 0.15s ease-out;

			&:hover {
				text-decoration: underline;
			}

			@media screen and (max-width: app.$mobile-width) {
				margin: 0;
				padding: 16px 32px;
			}
		}
	}

	button {
		display: none;
		margin-left: auto;

		@media screen and (max-width: app.$mobile-width) {
			display: inline-block;
		}
	}

	.spacer {
		height: 84px;
		flex: 0 0 auto;

		@media screen and (max-width: app.$mobile-width) {
			height: 52px;
		}
	}

	.shade {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.75);
		position: fixed;
		top: 0;
		left: 0;
	}

	.minimized {
		padding-top: 12px;
		padding-bottom: 12px;
		box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.15);

		@media screen and (max-width: app.$mobile-width) {
			padding-top: 8px;
			padding-bottom: 8px;
		}

		.name {
			font-size: 1.25em;
			line-height: 1.25em;

			:global(svg) {
				height: 1.25em;
				width: 1.25em;
			}
		}

		@media screen and (min-width: (app.$mobile-width + 1px)) {
			nav a {
				font-size: 0.85em;
				line-height: 0.85em;
				margin-left: 16px;
			}
		}
	}
</style>
