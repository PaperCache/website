<script lang="ts">
    import { base } from "$app/paths";
    import { page } from "$app/state";
    import CircleArrowSvg from "$lib/svgs/CircleArrowSvg.svelte";

	const { children } = $props();
	let mobileNavOpen: boolean = $state(false);

	const GUIDE_SECTIONS: GuideSection[] = [
		{
			title: "Getting started",
			modules: [
				initModule("getting-started/installation", "Installation"),
				initModule("getting-started/configuration", "Configuration"),
			],
		},

		{
			title: "Usage",
			modules: [
				initModule("usage/clients", "Clients"),
				initModule("usage/wire", "Wire protocol"),
			],
		},

		{
			title: "Eviction policies",
			modules: [
				initModule("eviction-policies", "Supported eviction policies"),
				initModule("eviction-policies/custom", "Implementing your own eviction policy"),
			],
		},
	];

	const moduleTitle = $derived(
		GUIDE_SECTIONS
			.flatMap(s => s.modules)
			.find(g => page.route.id?.endsWith(g.slug))?.title
	);

	function initModule(slug: string, title: string): GuideModule {
		return {
			slug,
			title,
			isCurrent: page.route.id?.endsWith(slug) || false,
		};
	}

	function toggleMobileNav() {
		mobileNavOpen = !mobileNavOpen;
	}

	function closeMobileNav() {
		mobileNavOpen = false;
	}

	type GuideSection = {
		title: string;
		modules: GuideModule[];
	};

	type GuideModule = {
		slug: string;
		title: string;
		isCurrent: boolean;
	};
</script>

<svelte:head>
	<title>{moduleTitle || "PaperCache"}</title>
</svelte:head>

<section>
	<nav>
		<button class={mobileNavOpen ? "" : "closed"} onclick={toggleMobileNav}>
			<span>{moduleTitle || "On this page"}</span>
			<CircleArrowSvg />
		</button>

		<ul class={mobileNavOpen ? "" : "closed"}>
			{#each GUIDE_SECTIONS as guideSection}
				<li>{guideSection.title}</li>
				<ul>
					{#each guideSection.modules as guideModule}
						{@render entry(guideModule.slug, guideModule.title)}
					{/each}
				</ul>
			{/each}
		</ul>
	</nav>

	<div>
		{#if moduleTitle}
			<h2>{moduleTitle}</h2>
		{/if}

		{@render children()}
	</div>
</section>

{#snippet entry(slug: string, title: string)}
	{@const isCurrent = page.route.id?.endsWith(slug)}

	<li class={isCurrent ? "current": ""}>
		<a href="{base}/guide/{slug}" onclick={closeMobileNav}>{title}</a>
	</li>
{/snippet}

<style lang="scss">
	@use "$lib/styles/app";

	section {
		flex: 1 1 auto;
		display: flex;
		overflow: hidden;

		@media screen and (max-width: app.$mobile-width) {
			flex-direction: column;
		}
	}

	nav {
		width: 20%;
		min-width: 280px;
		max-width: 340px;
		padding: 0 24px 32px;
		background-color: #f8f8f8;
		border-right: 1px solid #dddddd;
		flex: 0 0 auto;
		overflow-y: auto;

		@media screen and (max-width: app.$mobile-width) {
			width: 100%;
			min-width: auto;
			max-width: none;
			margin-top: 16px;
			padding: 0 16px;
			border-right: 0;

			button {
				width: 100%;
				text-align: left;
				padding: 8px 12px;
				background-color: #ffffff;
				border: 1px solid #dddddd;
				border-top-right-radius: 4px;
				border-top-left-radius: 4px;
				display: flex !important;
				align-items: center;

				span {
					color: #222222;
					font-size: 1.15em;
					line-height: 1.15em;
					font-weight: 700;
					flex: 1 1 auto;
				}

				:global(svg) {
					height: 1.35em;
					width: 1.35em;
					margin-left: 8px;
					flex: 0 0 auto;
					transition: transform 0.15s ease-out;
				}

				&.closed {
					border-radius: 4px;

					:global(svg) {
						transform: rotate(180deg);
					}
				}
			}

			> ul {
				padding: 8px !important;
				border-right: 1px solid #dddddd;
				border-bottom: 1px solid #dddddd;
				border-left: 1px solid #dddddd;
				border-bottom-right-radius: 4px;
				border-bottom-left-radius: 4px;
				transition: height 0.25s ease-out;

				&.closed {
					display: none;
				}

				li:first-of-type {
					margin-top: 8px;
				}
			}
		}

		button {
			display: none;
		}

		ul {
			padding-left: 0;
			list-style-type: none;

			ul {
				margin-top: 4px;
				padding-left: 8px;

				li {
					margin-top: 0;
					padding-left: 8px;
					border-left: 4px solid transparent;

					&.current {
						border-left: 4px solid #222222;

						a {
							font-weight: 700;
						}
					}
				}
			}

			li {
				font-size: 1.1em;
				line-height: 1.5em;
				font-weight: 700;
				margin-top: 32px;

				a {
					color: #222222;
					font-size: 0.9em;
					line-height: 1.25em;
				}
			}
		}
	}

	div {
		padding: 32px;
		flex: 1 1 auto;
		overflow-y: auto;

		@media screen and (max-width: app.$mobile-width) {
			padding: 16px;
		}

		h2 {
			color: #222222;
			font-size: 1.5em;
			line-height: 1.5em;
			font-weight: 700;
			margin-bottom: 16px;
			padding-bottom: 8px;
			border-bottom: 1px solid #dddddd;
		}
	}
</style>
