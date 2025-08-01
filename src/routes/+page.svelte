<script lang="ts">
	import { base } from "$app/paths";
	import Content from "$lib/components/Content.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import BarChart from "$lib/components/chart/BarChart.svelte";
	import LineChart from "$lib/components/chart/LineChart.svelte";
	import LogoSvg from "$lib/svgs/LogoSvg.svelte";
	import policiesData from "$lib/data/policies.json";
	import policiesTimeData from "$lib/data/policies-time.json";
</script>

<svelte:head>
	<title>PaperCache</title>
</svelte:head>

<section class="splash">
	<h1>PaperCache</h1>
	<h2>An in-memory cache with dynamic eviction policies.</h2>

	{#each { length: 10 } as _}
		<div class="bubble">
			<LogoSvg />
		</div>
	{/each}
</section>

<Content>
	<section class="line-chart">
		<h2>Lower your miss ratio by dynamically switching eviction policies.</h2>

		<div class="chart-container">
			<LineChart
				lines={policiesTimeData}
				xLabel="Time (hrs)"
				yLabel="Miss ratio"
				yMin={0}
				yMax={1}
			/>
		</div>
	</section>

	<section class="vertical-split">
		<div class="content">
			<h2>Savings over static eviction policy caches</h2>
			<p>PaperCache switches between any eviction policy, improving cache performance automatically. PaperCache can reduce its miss ratio by up to 48.5% compared to a statically configured LRU cache.</p>
		</div>

		<div class="chart">
			<BarChart
				yLabel="Savings (%)"
				data={policiesData}
			/>
		</div>
	</section>

	<section>
		<h2>Getting started</h2>
		<p>To try PaperCache locally, follow our <Tag href="{base}/guide/getting-started/installation">installation guide</Tag>.</p>
	</section>
</Content>

<style lang="scss">
	@use "sass:color";
	@use "$lib/styles/app";

	$splash-height: 400px;
	$splash-height-mobile: 250px;

	section {
		margin-top: 64px;

		@media screen and (max-width: app.$mobile-width) {
			margin-top: 32px;
			flex-direction: column;
		}

		&.line-chart {
			text-align: center;

			.chart-container {
				height: 300px;

				@media screen and (max-width: app.$mobile-width) {
					height: 200px;
				}
			}
		}

		.content {
			@media screen and (max-width: app.$mobile-width) {
				height: auto;
				width: 100%;
			}
		}

		.chart {
			@media screen and (max-width: app.$mobile-width) {
				width: 100%;
				margin-top: 16px;
			}
		}

		h2 {
			@include app.themed("light") { color: #222222; }
			@include app.themed("night") { color: #ffffff; }
			font-size: 1.7em;
			line-height: 1.7em;
			font-weight: 700;
			margin-bottom: 8px;

			@media screen and (max-width: app.$mobile-width) {
				font-size: 1.15em;
				line-height: 1.15em;
				text-align: center;
			}
		}

		p {
			@include app.themed("light") { color: #222222; }
			@include app.themed("night") { color: #ffffff; }
			font-size: 1.15em;

			@media screen and (max-width: app.$mobile-width) {
				font-size: 1.05em;
				line-height: 1.5em;
			}
		}

		&.vertical-split {
			display: flex;

			.content {
				width: 50%;

				@media screen and (max-width: app.$mobile-width) {
					width: 100%;
				}
			}

			.chart {
				min-height: 300px;
				width: 50%;

				@media screen and (max-width: app.$mobile-width) {
					min-height: auto;
					width: 100%;
				}
			}
		}
	}

	.splash {
		height: $splash-height;
		width: 100%;
		margin-top: 0;
		padding: 16px;
		background: linear-gradient(0deg, color.adjust(app.$theme-color, $blackness: 25%), app.$theme-color);
		text-align: center;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		@media screen and (max-width: app.$mobile-width) {
			height: $splash-height-mobile;
		}

		h1 {
			@include app.themed("light") { color: #ffffff; }
			@include app.themed("night") { color: #ffffff; }
			font-size: 5em;
			font-weight: 700;

			@media screen and (max-width: app.$mobile-width) {
				font-size: 3em;
			}
		}

		h2 {
			@include app.themed("light") { color: #ffffff; }
			@include app.themed("night") { color: #ffffff; }
			font-size: 1.4em;
			font-weight: 300;
			margin-top: 4px;

			@media screen and (max-width: app.$mobile-width) {
				font-size: 0.8em;
			}
		}

		h1, h2 {
			z-index: 1;
		}

		.bubble {
			height: 64px;
			width: 64px;
			padding: 16px;
			background-color: rgba(255, 255, 255, 0.45);
			border-radius: 8px;
			position: absolute;
			bottom: -150px;
			animation: bubble-float 20s linear infinite;
			z-index: 0;

			&:nth-child(1) {
				height: 80px;
				width: 80px;
				left: 25%;
				animation-delay: 0s;
			}

			&:nth-child(2) {
				height: 64px;
				width: 64px;
				left: 60%;
				animation-delay: 6s;
				animation-duration: 6s;
			}

			&:nth-child(3) {
				height: 64px;
				width: 64px;
				left: 70%;
				animation-delay: 4s;
			}

			&:nth-child(4) {
				height: 60px;
				width: 60px;
				left: 5%;
				animation-delay: 0s;
				animation-duration: 7s;
			}

			&:nth-child(5) {
				height: 64px;
				width: 64px;
				left: 90%;
				animation-delay: 0s;
			}

			&:nth-child(6) {
				height: 110px;
				width: 110px;
				left: 75%;
				animation-delay: 3s;
			}

			&:nth-child(7) {
				height: 150px;
				width: 150px;
				left: 35%;
				animation-delay: 0s;
				animation-duration: 13s;
			}

			&:nth-child(8) {
				height: 64px;
				width: 64px;
				left: 50%;
				animation-delay: 15s;
				animation-duration: 30s;
			}

			&:nth-child(9) {
				height: 64px;
				width: 64px;
				left: 20%;
				animation-delay: 2s;
				animation-duration: 25s;
			}

			&:nth-child(10) {
				height: 150px;
				width: 150px;
				left: 85%;
				animation-delay: 0s;
				animation-duration: 10s;
			}

			:global(svg) {
				height: 100%;
				width: 100%;
				opacity: 0.5;
			}

			@keyframes bubble-float {
				0% {
					border-radius: 8px;
					opacity: 1;
					transform: translateY(0) rotate(0deg);
				}

				100% {
					border-radius: 50%;
					opacity: 0;
					transform: translateY(-$splash-height - 150px) rotate(720deg);

					@media screen and (max-width: app.$mobile-width) {
						transform: translateY(-$splash-height-mobile - 150px) rotate(720deg);
					}
				}
			}
		}
	}
</style>
