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
		yMin,
		yMax,
		lines,
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
			type: "line",
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
						min: yMin,
						max: yMax,
					},
				},
				plugins: {
					legend: {
						display: true,
					},
				},
				maintainAspectRatio: false,
			},
			data: {
				datasets: lines.map((line, i) => {
					return {
						label: line.label,
						data: line.points.map(p => {
							return {
								x: Math.round(p.x).toString(),
								y: p.y,
							};
						}),
						borderColor: COLORS[i % COLORS.length],
						borderWidth: line.width || 1,
						fill: false,
						pointRadius: 0,
					};
				}),
			},
		});
	});

	type Props = {
		xLabel?: string;
		yLabel?: string;
		yMin?: number;
		yMax?: number;
		lines: Line[],
	};

	type Line = {
		label: string;
		width?: number;
		points: LinePoint[];
	};

	type LinePoint = {
		x: number;
		y: number;
	}
</script>

<div
	class="container"
	bind:clientHeight={height}
	bind:clientWidth={width}
>
	<canvas bind:this={canvas} {height} {width}></canvas>
</div>

<style lang="scss">
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
