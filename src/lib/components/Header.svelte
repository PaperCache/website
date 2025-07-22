<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { base } from "$app/paths";
	import { ThemeManager } from "$lib/utils/theme-manager";
	import links from "$lib/data/links.json";

	import LogoSvg from "$lib/svgs/LogoSvg.svelte";
	import MenuSvg from "$lib/svgs/MenuSvg.svelte";
	import ExternalSvg from "$lib/svgs/ExternalSvg.svelte";
	import SunSvg from "$lib/svgs/SunSvg.svelte";
	import MoonSvg from "$lib/svgs/MoonSvg.svelte";

	let {
		minimized,
		fixed,
	}: Props = $props();

	const SCROLLING_THRESHOLD: number = 0;

	let spacerHeight: number = $state(84);
	let scrolling: boolean = $state(false);
	let menuOpen: boolean = $state(false);

	const theme = ThemeManager.get();

	function handleScroll() {
		scrolling = window.scrollY > SCROLLING_THRESHOLD;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	onMount(() => {
		scrolling = window.scrollY > SCROLLING_THRESHOLD;

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	type Props = {
		minimized?: boolean;
		fixed?: boolean;
	};
</script>

<header
	class={minimized || scrolling ? "minimized" : ""}
	bind:clientHeight={spacerHeight}
	style:position={fixed ? "fixed" : ""}
>
	<a href="{base}/" class="name">
		<LogoSvg />
		PaperCache
	</a>

	<button class="theme-toggle" onclick={ThemeManager.toggle.bind(null, theme, $theme)}>
		{#if $theme === "light"}
			<SunSvg />
		{:else}
			<MoonSvg />
		{/if}
	</button>

	<button class="menu-toggle" onclick={toggleMenu}>
		<MenuSvg />
	</button>

	{#if menuOpen}
		<div class="shade" onclick={closeMenu} aria-hidden="true"></div>
	{/if}

	<nav class={menuOpen ? "open" : ""}>
		{@render navItem(`${base}/`, "Home")}
		{@render navItem(`${base}/guide`, "Guide")}
		{@render navItem(links.githubBase, "GitHub")}
		{@render navItem(links.acmPaper, "HotStorage'25")}
	</nav>
</header>

{#snippet navItem(href: string, text: string)}
	{@const isCurrent = page.route.id === href || page.route.id?.startsWith(`${href}/`)}
	{@const isExternal = href.startsWith("http")}
	{@const target = isExternal ? "_blank" : "_self"}

	<a {href} class={isCurrent ? "current": ""} {target}>
		{text}

		{#if isExternal}
			<ExternalSvg />
		{/if}
	</a>
{/snippet}

{#if fixed}
	<div class="spacer" style:height={`${spacerHeight}px`}></div>
{/if}

<style lang="scss">
	@use "$lib/styles/app";

	header {
		width: 100%;
		padding: 20px 32px;
		display: flex;
		@include app.themed("light") { background-color: #ffffff; }
		@include app.themed("night") { background-color: #222222; }
		align-items: center;
		top: 0;
		left: 0;
		transition: padding 0.15s ease-out, box-shadow 0.15s ease-out;
		z-index: 9999;

		@media screen and (max-width: app.$mobile-width) {
			padding: 8px 16px;
		}
	}

	.name {
		@include app.themed("light") { color: #222222; }
		@include app.themed("night") { color: #ffffff; }
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
		display: flex;

		&.open {
			left: 20%;
		}

		@media screen and (max-width: app.$mobile-width) {
			height: 100%;
			width: 80%;
			padding: 64px 0;
			@include app.themed("light") { background-color: #ffffff; }
			@include app.themed("night") { background-color: #222222; }
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
			@include app.themed("light") { color: #555555; }
			@include app.themed("night") { color: #dddddd; }
			font-size: 1em;
			line-height: 1em;
			margin-left: 24px;
			display: flex;
			align-items: center;
			transition:
				font-size 0.15s ease-out,
				line-height 0.15s ease-out,
				margin 0.15s ease-out;

			&:hover {
				text-decoration: underline;
			}

			&.current {
				font-weight: 700;
			}

			@media screen and (max-width: app.$mobile-width) {
				margin: 0;
				padding: 16px 32px;
			}

			:global(svg) {
				height: 1em;
				width: 1em;
				margin-left: 4px;
				@include app.themed("light") { fill: #555555; }
				@include app.themed("night") { fill: #ffffff; }
			}
		}
	}

	.menu-toggle {
		height: 1.85em;
		width: 1.85em;
		display: none;
		margin-left: 16px;

		@media screen and (max-width: app.$mobile-width) {
			display: inline-block;
		}

		:global(svg) {
			height: 100%;
			width: 100%;
			@include app.themed("light") { fill: #555555; }
			@include app.themed("night") { fill: #ffffff; }
		}
	}

	.theme-toggle {
		height: 1.5em;
		width: 1.5em;
		margin-left: auto;

		:global(svg) {
			height: 100%;
			width: 100%;
			@include app.themed("light") { fill: #555555; }
			@include app.themed("night") { fill: #ffffff; }
		}
	}

	.spacer {
		flex: 0 0 auto;
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
		padding: 12px 24px;
		box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.15);

		@media screen and (max-width: app.$mobile-width) {
			padding: 8px 16px;
		}

		.name {
			font-size: 1.25em;
			line-height: 1.25em;

			:global(svg) {
				height: 1.25em;
				width: 1.25em;
			}
		}

		.theme-toggle {
			height: 1.25em;
			width: 1.25em;
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
