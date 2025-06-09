<script lang="ts">
	import Content from "$lib/components/Content.svelte";
	import BarChart from "$lib/components/chart/BarChart.svelte";
	import policiesData from "$lib/data/policies.json";
</script>

<section class="splash">
	<h1>PaperCache</h1>
	<h2>An in-memory cache with dynamic eviction policies.</h2>

	{#each { length: 0 } as _}
		<div class="bubble"></div>
	{/each}
</section>

<Content>
	<section>
		<div class="content">
			<h2>Savings over static eviction policy caches</h2>
			<p>PaperCache</p>
		</div>

		<div class="chart">
			<BarChart
				yLabel="Miss ratio savings (%)"
				data={policiesData}
			/>
		</div>
	</section>
</Content>

<style lang="scss">
	@use "sass:color";
	@use "$lib/styles/app";

	$splash-height: 400px;
	$splash-height-mobile: 300px;

	section {
		margin-top: 64px;
		display: flex;

		.content {
			height: 300px;
			width: 50%;
		}

		.chart {
			width: 50%;
		}

		h2 {
			color: #222222;
			font-size: 24px;
			font-weight: 700;
			margin-bottom: 8px;
		}

		p {
			color: #222222;
			font-size: 16px;
			line-height: 22px;
		}
	}

	.splash {
		height: $splash-height;
		width: 100%;
		margin-top: 0;
		padding: 16px;
		background: linear-gradient(0deg, color.adjust(app.$theme-color, $lightness: 30%), app.$theme-color);
		text-align: center;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		@media screen and (max-width: app.$mobile-width) {
			height: $splash-height-mobile;
		}

		h1 {
			color: #ffffff;
			font-size: 72px;
			font-weight: 700;

			@media screen and (max-width: app.$mobile-width) {
				font-size: 50px;
			}
		}

		h2 {
			color: #ffffff;
			font-size: 24px;
			font-weight: 300;
			margin-top: 4px;

			@media screen and (max-width: app.$mobile-width) {
				font-size: 20px;
			}
		}

		.bubble {
			height: 64px;
			width: 64px;
			padding: 16px;
			background-color: rgba(255, 255, 255, 0.25);
			border-radius: 8px;
			position: absolute;
			bottom: -150px;
			animation: bubble-float 20s linear infinite;

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
				fill: rgba(255, 255, 255, 0.25);
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
