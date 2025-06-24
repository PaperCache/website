<script lang="ts">
    import { base } from "$app/paths";
    import { page } from "$app/state";

	const { children } = $props();

	const GUIDE_SECTIONS: GuideSection[] = [
		{
			title: "Getting started",
			modules: [
				initModule("getting-started/installation", "Installation"),
				initModule("getting-started/configuration", "Basic configuration"),
			],
		},

		{
			title: "Usage",
			modules: [
				initModule("usage/clients", "Clients"),
				initModule("usage/configuration", "Advanced configuration"),
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

<section>
	<nav>
		<ul>
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
		<a href="{base}/guide/{slug}">{title}</a>
	</li>
{/snippet}

<style lang="scss">
	nav {
		width: 340px;
		padding: 0 16px 16px;
		border-right: 1px solid #dddddd;
		flex: 0 0 auto;
		overflow-y: auto;

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

	section {
		flex: 1 1 auto;
		display: flex;
	}
</style>
