<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { base } from "$app/paths";
    import LogoSvg from "$lib/svgs/LogoSvg.svelte";
    import MenuSvg from "$lib/svgs/MenuSvg.svelte";

    const {
    	minimized,
    }: Props = $props();

    const SCROLLING_THRESHOLD: number = 0;

    let scrolling: boolean = $state(false);
    let menuOpen: boolean = $state(false);

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
	};
</script>

<header class={minimized || scrolling ? "minimized" : ""}>
	<a href="{base}/" class="name">
		<LogoSvg />
		PaperCache
	</a>

	<button onclick={toggleMenu}>
		<MenuSvg />
	</button>

	{#if menuOpen}
		<div class="shade" onclick={closeMenu} aria-hidden="true"></div>
	{/if}

	<nav class={menuOpen ? "open" : ""}>
		{@render navItem(`${base}/`, "Home")}
		{@render navItem(`${base}/guide`, "Guide")}
		{@render navItem(`${base}/`, "Paper")}
		{@render navItem(`${base}/`, "GitHub")}
	</nav>
</header>

{#snippet navItem(href: string, text: string)}
	{@const isCurrent = page.route.id === href}
	<a {href} class={isCurrent ? "current": ""}>{text}</a>
{/snippet}

<div class={[minimized ? "small" : "", "spacer"]}></div>

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

			&.current {
				font-weight: 700;
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

		&.small {
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
