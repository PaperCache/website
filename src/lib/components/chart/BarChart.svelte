<script lang="ts">
	import Chart from "chart.js/auto";
	import { onMount } from "svelte";

	const COLORS: string[] = [
		"#c4342b",
		"#0071ad",
		"#71ad00",
		"#554ec9",
		"#f7790d",
		"#e0ca3c",
		"#47a8bd",
		"#006a67",
		"#f29f05",
	];

	const {
		xLabel,
		yLabel,
		data,
	}: Props = $props();

	let canvas: HTMLCanvasElement;

	let chart: Chart | undefined = $state();
	let height: number | undefined = $state();
	let width: number | undefined = $state();

	$effect(() => chart?.resize(width, height));

	onMount(() => {
		const font = {
			family: "'Lato', sans-serif",
			size: 16,
		};

		chart = new Chart(canvas, {
			type: "bar",
			options: {
				scales: {
					x: {
						title: {
							text: xLabel,
							display: !!xLabel,
							font,
						},
					},
					y: {
						title: {
							text: yLabel,
							display: !!yLabel,
							font,
						},
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
			data: {
				labels: data.map(b => b.label),
				datasets: [{
					data: data.map(b => b.value),
					backgroundColor: data.map((_, i) => COLORS[i % COLORS.length]),
					barPercentage: 1.25,
				}],
			},
		});
	});

	type Props = {
		xLabel?: string;
		yLabel?: string;
		data: BarData[],
	};

	type BarData = {
		label: string;
		value: number;
	};
</script>

<div
	class="container"
	bind:clientHeight={height}
	bind:clientWidth={width}
>
	<canvas bind:this={canvas}></canvas>
</div>

<style lang="scss">
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
